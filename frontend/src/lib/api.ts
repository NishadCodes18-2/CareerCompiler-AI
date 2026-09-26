/**
 * CareerCompiler AI - Frontend API Client
 * Seamlessly connects to FastAPI backend with localStorage token handling,
 * automatic demo session fallback, and robust error handling.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("careercompiler_token");
  }
  return null;
}

export function setAuthToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("careercompiler_token", token);
  }
}

export function clearAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("careercompiler_token");
    localStorage.removeItem("careercompiler_user");
  }
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${API_BASE}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: "API request failed" }));
      throw new Error(err.detail || `HTTP Error ${response.status}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return (await response.text()) as any;
  } catch (error: any) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

// Auth API
export const authApi = {
  demoLogin: async () => {
    const data = await apiRequest("/auth/demo-login", { method: "POST" });
    setAuthToken(data.access_token);
    localStorage.setItem("careercompiler_user", JSON.stringify(data));
    return data;
  },
  login: async (credentials: any) => {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setAuthToken(data.access_token);
    localStorage.setItem("careercompiler_user", JSON.stringify(data));
    return data;
  },
  register: async (userData: any) => {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    setAuthToken(data.access_token);
    localStorage.setItem("careercompiler_user", JSON.stringify(data));
    return data;
  },
  me: async () => {
    return await apiRequest("/auth/me");
  },
};

// Profile API
export const profileApi = {
  getProfile: async () => apiRequest("/profile"),
  updateProfile: async (data: any) =>
    apiRequest("/profile", { method: "PUT", body: JSON.stringify(data) }),
  addProject: async (data: any) =>
    apiRequest("/profile/projects", { method: "POST", body: JSON.stringify(data) }),
  deleteProject: async (id: string) =>
    apiRequest(`/profile/projects/${id}`, { method: "DELETE" }),
  addSkill: async (data: any) =>
    apiRequest("/profile/skills", { method: "POST", body: JSON.stringify(data) }),
  deleteSkill: async (id: string) =>
    apiRequest(`/profile/skills/${id}`, { method: "DELETE" }),
  addEducation: async (data: any) =>
    apiRequest("/profile/educations", { method: "POST", body: JSON.stringify(data) }),
  addExperience: async (data: any) =>
    apiRequest("/profile/experiences", { method: "POST", body: JSON.stringify(data) }),
  addCertification: async (data: any) =>
    apiRequest("/profile/certifications", { method: "POST", body: JSON.stringify(data) }),
  addAchievement: async (data: any) =>
    apiRequest("/profile/achievements", { method: "POST", body: JSON.stringify(data) }),
};

// Evidence API
export const evidenceApi = {
  list: async () => apiRequest("/evidence"),
  getGraph: async () => apiRequest("/evidence/graph"),
  create: async (data: any) =>
    apiRequest("/evidence", { method: "POST", body: JSON.stringify(data) }),
  updateVerification: async (id: string, status: string, user_notes?: string) =>
    apiRequest(`/evidence/${id}/verification`, {
      method: "PUT",
      body: JSON.stringify({ verification_status: status, user_notes }),
    }),
};

// GitHub API
export const githubApi = {
  analyze: async (usernameOrUrl: string) =>
    apiRequest("/github/analyze", {
      method: "POST",
      body: JSON.stringify({ username_or_url: usernameOrUrl }),
    }),
  approve: async (payload: any) =>
    apiRequest("/github/approve", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

// Documents API
export const documentApi = {
  upload: async (file: File, isCertificate = false) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("is_certificate", String(isCertificate));
    return apiRequest("/documents/upload", {
      method: "POST",
      body: formData,
    });
  },
  list: async () => apiRequest("/documents"),
};

// Jobs & Market Research API
export const jobsApi = {
  analyze: async (jobData: any) =>
    apiRequest("/jobs/analyze", {
      method: "POST",
      body: JSON.stringify(jobData),
    }),
  list: async () => apiRequest("/jobs"),
  getRoleFingerprint: async (role: string) =>
    apiRequest(`/jobs/role-fingerprint?role=${encodeURIComponent(role)}`),
  getMarketCitations: async (role: string) =>
    apiRequest(`/jobs/market-citations?role=${encodeURIComponent(role)}`),
};

// Matching & Roadmap API
export const matchingApi = {
  getDiagnostic: async (role: string, jdId?: string) => {
    let url = `/matching/diagnostic?target_role=${encodeURIComponent(role)}`;
    if (jdId) url += `&job_description_id=${jdId}`;
    return apiRequest(url);
  },
  getRoadmap: async (role: string) =>
    apiRequest(`/matching/roadmap?target_role=${encodeURIComponent(role)}`),
  addRoadmapItem: async (data: any) =>
    apiRequest("/matching/roadmap", { method: "POST", body: JSON.stringify(data) }),
  toggleRoadmapItem: async (id: string) =>
    apiRequest(`/matching/roadmap/${id}/toggle`, { method: "PUT" }),
};

// Resumes API
export const resumesApi = {
  compile: async (payload: any) =>
    apiRequest("/resumes/compile", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  list: async () => apiRequest("/resumes"),
  get: async (id: string) => apiRequest(`/resumes/${id}`),
  updateBullet: async (bulletId: string, data: any) =>
    apiRequest(`/resumes/bullets/${bulletId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  getProofView: async (id: string) => apiRequest(`/resumes/${id}/proof-view`),
  preExportCheck: async (id: string) => apiRequest(`/resumes/${id}/pre-export-check`),
  getExportHtmlUrl: (id: string, template = "classic_ats") =>
    `${API_BASE}/resumes/${id}/export?template=${template}`,
};

// Analysis API
export const analysisApi = {
  atsTest: async (resumeId: string) => apiRequest(`/analysis/${resumeId}/ats-test`),
  recruiterReview: async (resumeId: string) =>
    apiRequest(`/analysis/${resumeId}/recruiter-review`),
  technicalReview: async (resumeId: string) =>
    apiRequest(`/analysis/${resumeId}/technical-review`),
  claimAudit: async (resumeId: string) => apiRequest(`/analysis/${resumeId}/claim-audit`),
  resolveClaim: async (bulletId: string, action: string, newText?: string) =>
    apiRequest("/analysis/resolve-claim", {
      method: "POST",
      body: JSON.stringify({ bullet_id: bulletId, action, new_text: newText }),
    }),
};

// Interview API
export const interviewApi = {
  getQuestions: async (resumeId: string) => apiRequest(`/interview/${resumeId}/questions`),
  defendBullet: async (bulletId: string) => apiRequest(`/interview/defend/${bulletId}`),
};

// Admin API
export const adminApi = {
  getStatus: async () => apiRequest("/admin/status"),
  reseed: async () => apiRequest("/admin/reseed", { method: "POST" }),
};
