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
  Globe
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
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#232733] pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold tracking-wider">Canonical Record</span>
          <h1 className="text-2xl font-bold text-white mt-0.5">Master Career Profile</h1>
          <p className="text-xs text-zinc-400">One canonical source of truth powering all compiled resume versions.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-blue-950/40 text-blue-300 border border-blue-800/40 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            {profile?.skills?.length || 0} Skills &bull; {profile?.projects?.length || 0} Projects
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-[#232733] pb-2">
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
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#151822]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-blue-800 text-white" : "bg-[#232733] text-zinc-400"}`}>
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
          <div className="p-5 rounded-xl bg-[#0f1118] border border-[#232733] space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-blue-400" /> Add Technical Project
            </h3>
            <form onSubmit={handleAddProject} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <input
                type="text"
                placeholder="Project Title (e.g. Distributed Key-Value Store)"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Repository URL (e.g. https://github.com/user/repo)"
                value={newProject.repository_url}
                onChange={(e) => setNewProject({ ...newProject, repository_url: e.target.value })}
                className="px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Technologies (comma separated: Python, Docker, Redis)"
                value={newProject.technologies}
                onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                className="sm:col-span-2 px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white focus:outline-none focus:border-blue-500"
              />
              <textarea
                rows={2}
                placeholder="Short technical description of what you architected..."
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="sm:col-span-2 px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white focus:outline-none focus:border-blue-500"
              />
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all cursor-pointer"
                >
                  Save Project to Profile
                </button>
              </div>
            </form>
          </div>

          {/* Project List */}
          <div className="space-y-4">
            {profile?.projects?.map((proj: any) => (
              <div key={proj.id} className="p-5 rounded-xl bg-[#0f1118] border border-[#232733] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">{proj.title}</h4>
                    <p className="text-xs text-zinc-400 mt-1">{proj.description}</p>
                    {proj.repository_url && (
                      <a
                        href={proj.repository_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:underline mt-2"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        {proj.repository_url}
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/20 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#232733]/60">
                  {proj.technologies?.map((tech: string, idx: number) => (
                    <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#161a26] text-blue-300 border border-blue-900/30">
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
          <div className="p-5 rounded-xl bg-[#0f1118] border border-[#232733] space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-blue-400" /> Add Technical Skill
            </h3>
            <form onSubmit={handleAddSkill} className="flex flex-wrap gap-3 text-xs">
              <input
                type="text"
                placeholder="Skill Name (e.g. Go, PostgreSQL, Docker)"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                className="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white focus:outline-none focus:border-blue-500"
              />
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                className="px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Languages">Languages</option>
                <option value="Frameworks">Frameworks & APIs</option>
                <option value="Databases">Databases & Storage</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Tools">Tools & Testing</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all cursor-pointer"
              >
                Add Skill
              </button>
            </form>
          </div>

          <div className="p-5 rounded-xl bg-[#0f1118] border border-[#232733] space-y-4">
            <h4 className="text-xs font-mono uppercase text-zinc-500 font-semibold">Active Profile Skills</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {profile?.skills?.map((skill: any) => (
                <div key={skill.id} className="flex items-center justify-between p-3 rounded-lg bg-[#141722] border border-[#232733]">
                  <div>
                    <span className="text-xs font-semibold text-white">{skill.name}</span>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5">
                      <span>{skill.category}</span>
                      <span>&bull;</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Verified ({skill.source})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-1 rounded text-zinc-500 hover:text-red-400 transition-colors"
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
        <div className="p-6 rounded-xl bg-[#0f1118] border border-[#232733] space-y-5">
          <form onSubmit={handleUpdateBasic} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Headline</label>
                <input
                  type="text"
                  value={profile?.headline || ""}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Target Role</label>
                <input
                  type="text"
                  value={profile?.target_role || ""}
                  onChange={(e) => setProfile({ ...profile, target_role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Email Contact</label>
                <input
                  type="email"
                  value={profile?.email_contact || ""}
                  onChange={(e) => setProfile({ ...profile, email_contact: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Phone</label>
                <input
                  type="text"
                  value={profile?.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-zinc-300 font-medium mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={profile?.github || ""}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-zinc-300 font-medium mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={profile?.linkedin || ""}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">Technical Summary</label>
              <textarea
                rows={3}
                value={profile?.summary || ""}
                onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white text-xs"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile?.student_mode}
                  onChange={(e) => setProfile({ ...profile, student_mode: e.target.checked })}
                  className="rounded border-[#232733] text-blue-600 focus:ring-0"
                />
                <span className="text-zinc-300">Enable Student / Fresher Mode (prioritizes Education & Projects over corporate experience)</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs cursor-pointer"
              >
                <Save className="h-3.5 w-3.5" />
                {saving ? "Saving..." : "Save Master Profile"}
              </button>
              {saveMessage && <span className="text-xs text-emerald-400 font-medium">{saveMessage}</span>}
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: EXPERIENCE */}
      {activeTab === "experience" && (
        <div className="space-y-4">
          {profile?.experiences?.map((exp: any) => (
            <div key={exp.id} className="p-5 rounded-xl bg-[#0f1118] border border-[#232733] space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{exp.position}</h4>
                  <p className="text-xs text-blue-400">{exp.company} &bull; {exp.location}</p>
                  <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{exp.start_date} – {exp.end_date}</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                  {exp.is_internship ? "INTERNSHIP" : "EXPERIENCE"}
                </span>
              </div>
              <p className="text-xs text-zinc-300 pt-1">{exp.description}</p>
              <div className="flex flex-wrap gap-1 pt-2">
                {exp.technologies?.map((tech: string, idx: number) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161a26] text-zinc-300">
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
            <div key={edu.id} className="p-5 rounded-xl bg-[#0f1118] border border-[#232733] space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{edu.institution}</h4>
                  <p className="text-xs text-blue-400">{edu.degree} in {edu.field_of_study}</p>
                  <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{edu.start_date} – {edu.end_date} &bull; GPA: {edu.grade}</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40">
                  ENROLLED
                </span>
              </div>
              {edu.coursework && (
                <div className="pt-2 text-xs text-zinc-400">
                  <span className="text-zinc-300 font-medium">Relevant Coursework: </span>
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
            <h4 className="text-xs font-mono uppercase text-zinc-500 font-semibold">Certifications</h4>
            {profile?.certifications?.map((c: any) => (
              <div key={c.id} className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{c.name}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                    VERIFIED
                  </span>
                </div>
                <p className="text-xs text-zinc-400">{c.issuer} &bull; {c.issue_date}</p>
                <p className="text-[10px] font-mono text-zinc-500">ID: {c.credential_id}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-zinc-500 font-semibold">Achievements & Hackathons</h4>
            {profile?.achievements?.map((a: any) => (
              <div key={a.id} className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{a.title}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40">
                    {a.category}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">{a.organization} &bull; {a.date}</p>
                <p className="text-xs text-zinc-300 pt-1">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
