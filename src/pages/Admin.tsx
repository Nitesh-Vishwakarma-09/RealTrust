import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Home } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [newProject, setNewProject] = useState({ name: "", description: "", category: "", image_url: "" });
  const [newClient, setNewClient] = useState({ name: "", designation: "", description: "", image_url: "" });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      else setUser(session.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) navigate("/auth");
      else setUser(session?.user);
    });

    fetchData();
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    const [projectsRes, clientsRes, contactsRes, subscribersRes] = await Promise.all([
      supabase.from("projects").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }),
    ]);
    setProjects(projectsRes.data || []);
    setClients(clientsRes.data || []);
    setContacts(contactsRes.data || []);
    setSubscribers(subscribersRes.data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const addProject = async () => {
    const { error } = await supabase.from("projects").insert(newProject);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Project added!" }); setNewProject({ name: "", description: "", category: "", image_url: "" }); fetchData(); }
  };

  const addClient = async () => {
    const { error } = await supabase.from("clients").insert(newClient);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Client added!" }); setNewClient({ name: "", designation: "", description: "", image_url: "" }); fetchData(); }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-muted p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl font-bold">Admin Panel</h1>
          <div className="flex gap-2">
            <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Home</Button></Link>
            <Button variant="outline" size="sm" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Logout</Button>
          </div>
        </div>

        <Tabs defaultValue="projects" className="bg-card rounded-xl p-6 shadow-lg">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
            <TabsTrigger value="clients">Clients ({clients.length})</TabsTrigger>
            <TabsTrigger value="contacts">Contacts ({contacts.length})</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers ({subscribers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <div className="grid md:grid-cols-4 gap-2">
              <Input placeholder="Name" value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})} />
              <Input placeholder="Category" value={newProject.category} onChange={(e) => setNewProject({...newProject, category: e.target.value})} />
              <Input placeholder="Image URL" value={newProject.image_url} onChange={(e) => setNewProject({...newProject, image_url: e.target.value})} />
              <Button onClick={addProject}>Add Project</Button>
            </div>
            <Textarea placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} />
            <div className="space-y-2 mt-4">{projects.map((p) => <div key={p.id} className="p-4 bg-muted rounded-lg"><strong>{p.name}</strong> - {p.category}</div>)}</div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <div className="grid md:grid-cols-4 gap-2">
              <Input placeholder="Name" value={newClient.name} onChange={(e) => setNewClient({...newClient, name: e.target.value})} />
              <Input placeholder="Designation" value={newClient.designation} onChange={(e) => setNewClient({...newClient, designation: e.target.value})} />
              <Input placeholder="Image URL" value={newClient.image_url} onChange={(e) => setNewClient({...newClient, image_url: e.target.value})} />
              <Button onClick={addClient}>Add Client</Button>
            </div>
            <Textarea placeholder="Description" value={newClient.description} onChange={(e) => setNewClient({...newClient, description: e.target.value})} />
            <div className="space-y-2 mt-4">{clients.map((c) => <div key={c.id} className="p-4 bg-muted rounded-lg"><strong>{c.name}</strong> - {c.designation}</div>)}</div>
          </TabsContent>

          <TabsContent value="contacts">
            <div className="space-y-2">{contacts.map((c) => <div key={c.id} className="p-4 bg-muted rounded-lg"><strong>{c.full_name}</strong> | {c.email} | {c.mobile} | {c.city}</div>)}</div>
          </TabsContent>

          <TabsContent value="subscribers">
            <div className="space-y-2">{subscribers.map((s) => <div key={s.id} className="p-4 bg-muted rounded-lg">{s.email}</div>)}</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
