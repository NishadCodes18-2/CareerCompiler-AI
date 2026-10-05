"use client";

import React, { useEffect, useState } from "react";
import {
  UserCheck,
  Code2,
  GraduationCap,
  Briefcase,
  Award,
  Plus,
  Trash2,
  CheckCircle2,
  Save,
  ShieldCheck,
  Globe,
  Sparkles
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { profileApi } from "@/lib/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "projects" | "skills" | "experience" | "education" | "certs">("projects");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // New item modal/form states
  const [newProject, setNewProject] = useState({ title: "", description: "", repository_url: "", technologies: "" });
  const [newSkill, setNewSkill] = useState({ name: "", category: "Languages", proficiency: "Intermediate" });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await profileApi.getProfile();
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateBasic = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");
    try {
      const updated = await profileApi.updateProfile({
        headline: profile.headline,
        summary: profile.summary,
        location: profile.location,
        phone: profile.phone,
        email_contact: profile.email_contact,
        linkedin: profile.linkedin,
        github: profile.github,
        student_mode: profile.student_mode,
        target_role: profile.target_role,
      });
      setProfile(updated);
      setSaveMessage("Profile saved successfully.");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    try {
      const techArray = newProject.technologies.split(",").map((t) => t.trim()).filter(Boolean);
      await profileApi.addProject({
        title: newProject.title,
        description: newProject.description,
        repository_url: newProject.repository_url,
        technologies: techArray,
      });
      setNewProject({ title: "", description: "", repository_url: "", technologies: "" });
      loadProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await profileApi.deleteProject(id);
      loadProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name) return;
    try {
      await profileApi.addSkill({
        name: newSkill.name,
        category: newSkill.category,
        proficiency: newSkill.proficiency,
        verified: true,
        source: "user",
      });
      setNewSkill({ name: "", category: "Languages", proficiency: "Intermediate" });
      loadProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await profileApi.deleteSkill(id);
      loadProfile();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-violet-500 border-t-transparent shadow-lg shadow-violet-500/30"></div>
        <span className="font-mono text-xs text-slate-400">Loading Master Profile Repository...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner - Luxury Dark Horizon Glow */}
      <div className="relative rounded-2xl p-6 bg-gradient-to-r from-[#0c0e15] via-[#121622] to-[#0c0e15] border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-96 h-48 bg-violet-600/15 blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute -bottom-24 left-1/4 w-96 h-48 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Candidate Photo with change badge */}
            <div className="relative h-20 w-20 rounded-2xl overflow-hidden border-2 border-violet-400 shadow-xl shrink-0 group">
              <img
                src={typeof window !== "undefined" && localStorage.getItem("careercompiler_avatar") || "/avatars/candidate.jpg"}
                alt="Candidate"
                className="h-full w-full object-cover"
              />
              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      const reader = new FileReader();
                      reader.onload = (evt) => {
                        const res = evt.target?.result as string;
                        if (res) {
                          localStorage.setItem("careercompiler_avatar", res);
                          window.dispatchEvent(new Event("avatar_updated"));
                          window.location.reload();
                        }
                      };
                      reader.readAsDataURL(f);
                    }
                  }}
                />
                <span className="text-[10px] font-bold">Edit</span>
              </label>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="pill-badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  CANONICAL REPOSITORY
                </span>
                <span className="pill-badge bg-white/5 text-slate-400 border border-white/10 text-[10px]">
                  PHOTO VERIFIED
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {profile?.headline || "Master Career Profile"}
              </h1>
              <p className="text-xs text-slate-400 max-w-xl">
                One canonical source of truth powering your self-training resume compiler.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="pill-badge bg-white/5 text-slate-300 border border-white/10 font-mono text-xs py-1.5 px-3">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 mr-1.5" />
              {profile?.skills?.length || 0} Skills &bull; {profile?.projects?.length || 0} Projects
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-3">
        {[
          { id: "projects", label: "Projects", icon: Code2, count: profile?.projects?.length },
          { id: "skills", label: "Technical Skills", icon: ShieldCheck, count: profile?.skills?.length },
          { id: "basic", label: "Basic & Contact", icon: UserCheck },
          { id: "experience", label: "Experience & Internships", icon: Briefcase, count: profile?.experiences?.length },
          { id: "education", label: "Education", icon: GraduationCap, count: profile?.educations?.length },
          { id: "certs", label: "Certificates & Honors", icon: Award, count: (profile?.certifications?.length || 0) + (profile?.achievements?.length || 0) },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-violet-600 text-white font-semibold shadow-md shadow-violet-600/30 border border-violet-500/40"
                  : "bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isActive ? "bg-black/30 text-white" : "bg-white/10 text-slate-300"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROJECTS */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          {/* Add project */}
          <div className="rounded-2xl p-6 space-y-4 bg-[#0c0e15] border border-white/10 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-wide">
              <Plus className="h-4 w-4 text-violet-400" /> Add Technical Project
            </h3>
            <form onSubmit={handleAddProject} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-mono text-[11px] mb-1">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Key-Value Store"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-sans"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-mono text-[11px] mb-1">Repository URL</label>
                <input
                  type="text"
                  placeholder="e.g. https://github.com/user/repo"
                  value={newProject.repository_url}
                  onChange={(e) => setNewProject({ ...newProject, repository_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-sans"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-400 font-mono text-[11px] mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  placeholder="Python, Docker, Redis, Raft"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-sans"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-400 font-mono text-[11px] mb-1">Architecture Summary</label>
                <textarea
                  rows={2}
                  placeholder="Short technical description of what you architected and benchmarked..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-sans"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="gradient-button px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-md shadow-violet-600/25 cursor-pointer"
                >
                  Save Project to Profile
                </button>
              </div>
            </form>
          </div>

          {/* Project List */}
          <div className="space-y-4">
            {profile?.projects?.map((proj: any) => (
              <div key={proj.id} className="card-glass rounded-2xl p-5 space-y-3 hover:border-white/20 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">{proj.title}</h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{proj.description}</p>
                    {proj.repository_url && (
                      <a
                        href={proj.repository_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#ff7849] hover:underline mt-2 font-mono"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        {proj.repository_url}
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {proj.technologies?.map((tech: string, idx: number) => (
                    <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SKILLS */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          <div className="card-glass rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-wide">
              <Plus className="h-4 w-4 text-violet-400" /> Add Technical Skill
            </h3>
            <form onSubmit={handleAddSkill} className="flex flex-wrap gap-3 text-xs">
              <input
                type="text"
                placeholder="Skill Name (e.g. Go, PostgreSQL, Docker)"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                className="flex-1 min-w-[200px] px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-sans"
              />
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-mono cursor-pointer"
              >
                <option value="Languages">Languages</option>
                <option value="Frameworks">Frameworks &amp; APIs</option>
                <option value="Databases">Databases &amp; Storage</option>
                <option value="DevOps & Cloud">DevOps &amp; Cloud</option>
                <option value="Tools">Tools &amp; Testing</option>
              </select>
              <button
                type="submit"
                className="gradient-button px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-md shadow-violet-600/25 cursor-pointer"
              >
                Add Skill
              </button>
            </form>
          </div>

          <div className="card-glass rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-mono uppercase text-zinc-400 font-semibold tracking-wider">Active Profile Skills</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {profile?.skills?.map((skill: any) => (
                <div key={skill.id} className="flex items-center justify-between p-3.5 rounded-xl bg-[#090b10] border border-white/10">
                  <div>
                    <span className="text-xs font-semibold text-white">{skill.name}</span>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5 font-mono">
                      <span>{skill.category}</span>
                      <span>&bull;</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="h-3 w-3" /> Verified ({skill.source})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-1 rounded text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BASIC INFO */}
      {activeTab === "basic" && (
        <div className="card-glass rounded-2xl p-6 space-y-5">
          <form onSubmit={handleUpdateBasic} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 font-mono text-[11px] mb-1">Headline</label>
                <input
                  type="text"
                  value={profile?.headline || ""}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-sans"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-mono text-[11px] mb-1">Target Role</label>
                <input
                  type="text"
                  value={profile?.target_role || ""}
                  onChange={(e) => setProfile({ ...profile, target_role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-sans"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-mono text-[11px] mb-1">Email Contact</label>
                <input
                  type="email"
                  value={profile?.email_contact || ""}
                  onChange={(e) => setProfile({ ...profile, email_contact: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-sans"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-mono text-[11px] mb-1">Phone</label>
                <input
                  type="text"
                  value={profile?.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-sans"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-mono text-[11px] mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={profile?.github || ""}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-sans"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-mono text-[11px] mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={profile?.linkedin || ""}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-mono text-[11px] mb-1">Technical Summary</label>
              <textarea
                rows={3}
                value={profile?.summary || ""}
                onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-sans"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile?.student_mode}
                  onChange={(e) => setProfile({ ...profile, student_mode: e.target.checked })}
                  className="rounded border-white/20 bg-[#090b10] text-violet-600 focus:ring-0"
                />
                <span className="text-slate-300 text-xs">Enable Student / Fresher Mode (prioritizes Education &amp; Projects over corporate experience)</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="submit"
                disabled={saving}
                className="gradient-button flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-md shadow-violet-600/25 cursor-pointer disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                {saving ? "Saving..." : "Save Master Profile"}
              </button>
              {saveMessage && <span className="text-xs text-emerald-400 font-medium font-mono">{saveMessage}</span>}
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: EXPERIENCE */}
      {activeTab === "experience" && (
        <div className="space-y-4">
          {profile?.experiences?.map((exp: any) => (
            <div key={exp.id} className="card-glass rounded-2xl p-5 space-y-2 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{exp.position}</h4>
                  <p className="text-xs text-violet-400 font-medium">{exp.company} &bull; {exp.location}</p>
                  <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{exp.start_date} – {exp.end_date}</p>
                </div>
                <span className="pill-badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">
                  {exp.is_internship ? "INTERNSHIP" : "EXPERIENCE"}
                </span>
              </div>
              <p className="text-xs text-zinc-300 pt-1 leading-relaxed">{exp.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.technologies?.map((tech: string, idx: number) => (
                  <span key={idx} className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-[#090b10] text-zinc-300 border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: EDUCATION */}
      {activeTab === "education" && (
        <div className="space-y-4">
          {profile?.educations?.map((edu: any) => (
            <div key={edu.id} className="card-glass rounded-2xl p-5 space-y-2 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{edu.institution}</h4>
                  <p className="text-xs text-violet-400 font-medium">{edu.degree} in {edu.field_of_study}</p>
                  <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{edu.start_date} – {edu.end_date} &bull; GPA: {edu.grade}</p>
                </div>
                <span className="pill-badge bg-white/5 text-zinc-300 text-[10px]">
                  ENROLLED
                </span>
              </div>
              {edu.coursework && (
                <div className="pt-2 text-xs text-zinc-400 font-mono text-[11px]">
                  <span className="text-white font-medium">Relevant Coursework: </span>
                  {edu.coursework.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 6: CERTS & ACHIEVEMENTS */}
      {activeTab === "certs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-zinc-400 font-semibold tracking-wider">Certifications</h4>
            {profile?.certifications?.map((c: any) => (
              <div key={c.id} className="card-glass rounded-2xl p-4.5 space-y-1.5 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{c.name}</span>
                  <span className="pill-badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-semibold">
                    VERIFIED
                  </span>
                </div>
                <p className="text-xs text-zinc-400">{c.issuer} &bull; {c.issue_date}</p>
                <p className="text-[10px] font-mono text-zinc-500">ID: {c.credential_id}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-zinc-400 font-semibold tracking-wider">Achievements &amp; Hackathons</h4>
            {profile?.achievements?.map((a: any) => (
              <div key={a.id} className="card-glass rounded-2xl p-4.5 space-y-1.5 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{a.title}</span>
                  <span className="pill-badge bg-violet-500/15 text-violet-300 border border-violet-500/30 text-[9px] font-medium">
                    {a.category}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">{a.organization} &bull; {a.date}</p>
                <p className="text-xs text-zinc-300 pt-1 leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
