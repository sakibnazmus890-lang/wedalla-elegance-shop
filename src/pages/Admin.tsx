import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { refreshSiteContent } from "@/hooks/useSiteContent";

type Row = { id: string; section: string; key: string; value: any };

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    supabase
      .from("site_content")
      .select("*")
      .order("section")
      .order("key")
      .then(({ data }) => {
        const list = (data ?? []) as Row[];
        setRows(list);
        const d: Record<string, string> = {};
        list.forEach((r) => (d[r.id] = typeof r.value === "string" ? r.value : String(r.value ?? "")));
        setDraft(d);
      });
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;

  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-3xl font-bold mb-3 text-foreground">No admin access</h1>
          <p className="text-muted-foreground mb-6 text-sm">
            You're signed in as <span className="text-foreground">{user.email}</span>, but you don't have the admin role yet.
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            An existing admin can grant you access from the database. If this is the first user, ask the project owner to insert{" "}
            <code className="text-foreground">user_roles(user_id, role)</code> with your user ID and role <code>admin</code>.
          </p>
          <Button variant="outline" onClick={() => supabase.auth.signOut().then(() => navigate("/auth"))}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  const save = async (row: Row) => {
    setSaving(row.id);
    const newValue = draft[row.id] ?? "";
    const { error } = await supabase
      .from("site_content")
      .update({ value: newValue as any, updated_by: user.id })
      .eq("id", row.id);
    setSaving(null);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved" });
      refreshSiteContent();
    }
  };

  const grouped = rows.reduce<Record<string, Row[]>>((acc, r) => {
    (acc[r.section] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/")}>View site</Button>
          <Button variant="outline" onClick={() => supabase.auth.signOut().then(() => navigate("/auth"))}>
            Sign out
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {Object.entries(grouped).map(([section, items]) => (
          <Card key={section}>
            <CardHeader>
              <CardTitle className="capitalize font-display">{section}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {items.map((row) => {
                const val = draft[row.id] ?? "";
                const multiline = val.length > 80 || val.includes("\n");
                const dirty = val !== (typeof row.value === "string" ? row.value : String(row.value ?? ""));
                return (
                  <div key={row.id} className="space-y-2">
                    <Label className="capitalize">{row.key}</Label>
                    {multiline ? (
                      <Textarea
                        rows={4}
                        value={val}
                        onChange={(e) => setDraft({ ...draft, [row.id]: e.target.value })}
                      />
                    ) : (
                      <Input value={val} onChange={(e) => setDraft({ ...draft, [row.id]: e.target.value })} />
                    )}
                    <div className="flex justify-end">
                      <Button size="sm" disabled={!dirty || saving === row.id} onClick={() => save(row)}>
                        {saving === row.id ? "Saving…" : "Save"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
