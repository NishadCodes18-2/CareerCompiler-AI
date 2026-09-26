from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.entities import ResumeVersion, ResumeSection, ResumeBullet, Profile, Skill, Education, Experience, Certification, Achievement
from app.services.audit_service import audit_service
from app.services.parser_test_service import parser_test_service

class ExportService:
    def pre_export_check(self, db: Session, resume_version_id: str) -> Dict[str, Any]:
        """Perform claim audit and parser validation before finalizing export."""
        audit_report = audit_service.audit_resume_version(db, resume_version_id)
        parser_report = parser_test_service.test_resume_parsability(db, resume_version_id)

        has_unsupported = audit_report["unsupported_claims"] > 0
        is_ready = not has_unsupported and parser_report["overall_status"] == "PASS"

        issues = []
        if has_unsupported:
            issues.append(f"{audit_report['unsupported_claims']} unsupported or unverified claims found.")
        if audit_report["needs_review_claims"] > 0:
            issues.append(f"{audit_report['needs_review_claims']} claims need review or candidate confirmation.")
        if parser_report["overall_status"] != "PASS":
            issues.append("ATS parsing warnings detected.")

        return {
            "is_ready": is_ready,
            "status_label": "Export Ready ✓" if is_ready else f"{len(issues)} issues require review",
            "support_rate_percent": audit_report["support_rate_percent"],
            "parser_sections_detected": parser_report["sections_detected"],
            "issues": issues,
            "audit_report": audit_report,
            "parser_report": parser_report
        }

    def generate_html_resume(self, db: Session, resume_version_id: str, template: str = "classic_ats") -> str:
        resume = db.query(ResumeVersion).filter(ResumeVersion.id == resume_version_id).first()
        if not resume:
            raise ValueError("Resume version not found")

        profile = resume.profile
        sections = db.query(ResumeSection).filter(ResumeSection.resume_version_id == resume_version_id).order_by(ResumeSection.order_index).all()
        bullets = db.query(ResumeBullet).filter(ResumeBullet.resume_version_id == resume_version_id).order_by(ResumeBullet.order_index).all()
        skills = db.query(Skill).filter(Skill.profile_id == profile.id).all()
        educations = db.query(Education).filter(Education.profile_id == profile.id).all()
        experiences = db.query(Experience).filter(Experience.profile_id == profile.id).all()
        certifications = db.query(Certification).filter(Certification.profile_id == profile.id).all()
        achievements = db.query(Achievement).filter(Achievement.profile_id == profile.id).all()

        # Styles tailored for each template
        theme_styles = {
            "classic_ats": {
                "font_family": "Georgia, serif",
                "header_align": "center",
                "accent_color": "#111827",
                "heading_border": "1px solid #111827",
                "container_padding": "32px"
            },
            "modern_tech": {
                "font_family": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                "header_align": "left",
                "accent_color": "#2563eb",
                "heading_border": "2px solid #2563eb",
                "container_padding": "32px"
            },
            "student_fresher": {
                "font_family": "'Inter', system-ui, sans-serif",
                "header_align": "center",
                "accent_color": "#0d9488",
                "heading_border": "1.5px solid #0d9488",
                "container_padding": "32px"
            },
            "minimal_exec": {
                "font_family": "Arial, Helvetica, sans-serif",
                "header_align": "left",
                "accent_color": "#374151",
                "heading_border": "1px solid #e5e7eb",
                "container_padding": "40px"
            }
        }.get(template, {
            "font_family": "Arial, sans-serif",
            "header_align": "center",
            "accent_color": "#111827",
            "heading_border": "1px solid #111827",
            "container_padding": "32px"
        })

        skills_by_category = {}
        for s in skills:
            skills_by_category.setdefault(s.category, []).append(s.name)

        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{profile.user.full_name} - Resume ({resume.target_role})</title>
<style>
  @page {{
    size: letter portrait;
    margin: 12mm 15mm;
  }}
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    font-family: {theme_styles['font_family']};
    color: #1f2937;
    background: #ffffff;
    line-height: 1.45;
    font-size: 10.5pt;
  }}
  .resume-container {{
    max-width: 800px;
    margin: 0 auto;
    padding: {theme_styles['container_padding']};
  }}
  .header {{
    text-align: {theme_styles['header_align']};
    margin-bottom: 16px;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 12px;
  }}
  .name {{
    font-size: 22pt;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #111827;
  }}
  .headline {{
    font-size: 11pt;
    font-weight: 600;
    color: {theme_styles['accent_color']};
    margin-top: 4px;
  }}
  .contact-bar {{
    margin-top: 6px;
    font-size: 9.5pt;
    color: #4b5563;
  }}
  .contact-bar a {{
    color: {theme_styles['accent_color']};
    text-decoration: none;
  }}
  .section {{
    margin-top: 14px;
  }}
  .section-title {{
    font-size: 11.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: {theme_styles['accent_color']};
    border-bottom: {theme_styles['heading_border']};
    padding-bottom: 2px;
    margin-bottom: 8px;
  }}
  .item {{
    margin-bottom: 10px;
  }}
  .item-header {{
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    color: #111827;
  }}
  .item-sub {{
    display: flex;
    justify-content: space-between;
    font-size: 9.5pt;
    color: #4b5563;
    font-style: italic;
    margin-bottom: 4px;
  }}
  ul.bullets {{
    list-style-type: disc;
    margin-left: 20px;
  }}
  ul.bullets li {{
    margin-bottom: 3px;
    font-size: 10pt;
    color: #374151;
  }}
  .skills-grid {{
    font-size: 10pt;
    color: #374151;
  }}
  .skills-row {{
    margin-bottom: 4px;
  }}
  .skills-label {{
    font-weight: 600;
    color: #111827;
  }}
  @media print {{
    body {{ background: transparent; }}
    .resume-container {{ padding: 0; }}
  }}
</style>
</head>
<body>
<div class="resume-container">
  <div class="header">
    <div class="name">{profile.user.full_name}</div>
    <div class="headline">{resume.target_role}</div>
    <div class="contact-bar">
      {profile.email_contact or profile.user.email} &bull; {profile.phone} &bull; {profile.location}
      <br/>
      <a href="{profile.github}">{profile.github.replace('https://', '')}</a> &bull;
      <a href="{profile.linkedin}">{profile.linkedin.replace('https://', '')}</a>
    </div>
  </div>
"""

        # Append sections in order
        for sec in sections:
            if not sec.is_visible:
                continue

            if sec.section_type == "summary" and (profile.summary or profile.headline):
                html += f"""
  <div class="section">
    <div class="section-title">{sec.title}</div>
    <p style="font-size: 10pt; color: #374151;">{profile.summary or profile.headline}</p>
  </div>"""

            elif sec.section_type == "education" and educations:
                html += f"""
  <div class="section">
    <div class="section-title">{sec.title}</div>"""
                for edu in educations:
                    html += f"""
    <div class="item">
      <div class="item-header">
        <span>{edu.institution}</span>
        <span>{edu.start_date} – {edu.end_date}</span>
      </div>
      <div class="item-sub">
        <span>{edu.degree} in {edu.field_of_study}</span>
        <span>{edu.grade}</span>
      </div>
      <div style="font-size: 9pt; color: #4b5563;">
        Key Coursework: {', '.join(edu.coursework or [])}
      </div>
    </div>"""
                html += "  </div>"

            elif sec.section_type == "projects":
                proj_bullets = [b for b in bullets if b.section_type == "projects"]
                html += f"""
  <div class="section">
    <div class="section-title">{sec.title}</div>
    <ul class="bullets">"""
                for pb in proj_bullets:
                    html += f"""
      <li>{pb.text}</li>"""
                html += """
    </ul>
  </div>"""

            elif sec.section_type == "experience" and experiences:
                exp_bullets = [b for b in bullets if b.section_type == "experience"]
                html += f"""
  <div class="section">
    <div class="section-title">{sec.title}</div>"""
                for exp in experiences:
                    html += f"""
    <div class="item">
      <div class="item-header">
        <span>{exp.company}</span>
        <span>{exp.start_date} – {exp.end_date}</span>
      </div>
      <div class="item-sub">
        <span>{exp.position}</span>
        <span>{exp.location}</span>
      </div>
    </div>"""
                if exp_bullets:
                    html += """
    <ul class="bullets">"""
                    for eb in exp_bullets:
                        html += f"""
      <li>{eb.text}</li>"""
                    html += """
    </ul>"""
                html += "  </div>"

            elif sec.section_type == "skills" and skills:
                html += f"""
  <div class="section">
    <div class="section-title">{sec.title}</div>
    <div class="skills-grid">"""
                for cat, sk_names in skills_by_category.items():
                    html += f"""
      <div class="skills-row">
        <span class="skills-label">{cat}:</span> {', '.join(sk_names)}
      </div>"""
                html += """
    </div>
  </div>"""

            elif sec.section_type == "certifications" and (certifications or achievements):
                html += f"""
  <div class="section">
    <div class="section-title">{sec.title}</div>
    <ul class="bullets">"""
                for cert in certifications:
                    html += f"""
      <li><strong>{cert.name}</strong> – {cert.issuer} ({cert.issue_date}) [ID: {cert.credential_id}]</li>"""
                for ach in achievements:
                    html += f"""
      <li><strong>{ach.title}</strong> – {ach.organization} ({ach.date})</li>"""
                html += """
    </ul>
  </div>"""

        html += """
</div>
</body>
</html>"""
        return html

export_service = ExportService()
