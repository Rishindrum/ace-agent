from pathlib import Path

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


ROOT = Path(r"C:\Users\Rindr\OneDrive\Documents\Projects\ace-agent")
OUT = ROOT / "output" / "pitch"
OUT.mkdir(parents=True, exist_ok=True)

BLACK = RGBColor(0x00, 0x00, 0x00)
GRAY = RGBColor(0x58, 0x61, 0x6B)
BLUE = RGBColor(0x2F, 0x61, 0xA8)
PALE_BLUE = "EAF1FB"


def set_cell_shading(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tc_pr.append(shd)
    shd.set(qn("w:fill"), fill)


def set_cell_margins(cell, top=100, start=120, bottom=100, end=120):
    tc = cell._tc
    tc_pr = tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in("w:tcMar")
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for margin, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        node = tc_mar.find(qn(f"w:{margin}"))
        if node is None:
            node = OxmlElement(f"w:{margin}")
            tc_mar.append(node)
        node.set(qn("w:w"), str(value))
        node.set(qn("w:type"), "dxa")


def add_table_borders(table, color="D9D9D9", size="6"):
    tbl_pr = table._tbl.tblPr
    borders = tbl_pr.first_child_found_in("w:tblBorders")
    if borders is None:
        borders = OxmlElement("w:tblBorders")
        tbl_pr.append(borders)
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        tag = f"w:{edge}"
        element = borders.find(qn(tag))
        if element is None:
            element = OxmlElement(tag)
            borders.append(element)
        element.set(qn("w:val"), "single")
        element.set(qn("w:sz"), size)
        element.set(qn("w:color"), color)


def prevent_row_split(row):
    tr_pr = row._tr.get_or_add_trPr()
    cant_split = OxmlElement("w:cantSplit")
    tr_pr.append(cant_split)


def set_font(run, name="Aptos"):
    run.font.name = name
    if run._element.rPr is None:
        run._element.get_or_add_rPr()
    rfonts = run._element.rPr.rFonts
    if rfonts is None:
        rfonts = OxmlElement("w:rFonts")
        run._element.rPr.insert(0, rfonts)
    rfonts.set(qn("w:ascii"), name)
    rfonts.set(qn("w:hAnsi"), name)
    rfonts.set(qn("w:eastAsia"), name)


def setup_document():
    doc = Document()
    section = doc.sections[0]
    section.page_width = Inches(8.5)
    section.page_height = Inches(11)
    section.top_margin = Inches(0.72)
    section.bottom_margin = Inches(0.72)
    section.left_margin = Inches(0.82)
    section.right_margin = Inches(0.82)

    normal = doc.styles["Normal"]
    normal.font.name = "Aptos"
    normal.font.size = Pt(11)
    normal.font.color.rgb = BLACK
    normal.paragraph_format.space_after = Pt(7)
    normal.paragraph_format.line_spacing = 1.12

    title = doc.styles["Title"]
    title.font.name = "Aptos Display"
    title.font.size = Pt(27)
    title.font.bold = True
    title.font.color.rgb = BLACK
    title.paragraph_format.space_after = Pt(8)

    for style_name, size, before, after in (
        ("Heading 1", 17, 16, 7),
        ("Heading 2", 13, 11, 5),
    ):
        style = doc.styles[style_name]
        style.font.name = "Aptos Display"
        style.font.size = Pt(size)
        style.font.bold = True
        style.font.color.rgb = BLACK
        style.paragraph_format.space_before = Pt(before)
        style.paragraph_format.space_after = Pt(after)
        style.paragraph_format.keep_with_next = True

    if "Metadata" not in doc.styles:
        meta = doc.styles.add_style("Metadata", WD_STYLE_TYPE.PARAGRAPH)
    else:
        meta = doc.styles["Metadata"]
    meta.font.name = "Aptos"
    meta.font.size = Pt(10)
    meta.font.color.rgb = GRAY
    meta.paragraph_format.space_after = Pt(14)

    footer = section.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = footer.add_run("ACE Agent")
    set_font(run)
    run.font.size = Pt(8.5)
    run.font.color.rgb = GRAY
    return doc


def add_title(doc, title, subtitle):
    p = doc.add_paragraph(style="Title")
    p.add_run(title)
    p = doc.add_paragraph(style="Metadata")
    p.add_run(subtitle)


def add_body(doc, text, bold_lead=None):
    p = doc.add_paragraph()
    if bold_lead:
        r = p.add_run(bold_lead)
        r.bold = True
        set_font(r)
    r = p.add_run(text)
    set_font(r)
    return p


def add_bullet(doc, text, level=0):
    style = "List Bullet" if level == 0 else "List Bullet 2"
    p = doc.add_paragraph(style=style)
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run(text)
    set_font(r)
    return p


def add_numbered(doc, text):
    p = doc.add_paragraph(style="List Number")
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run(text)
    set_font(r)
    return p


def build_written():
    doc = setup_document()
    add_title(doc, "ACE Agent Written Pitch Submission", "Pitch to Prototype  |  Fall 2026")
    intro = doc.add_paragraph()
    intro.paragraph_format.space_after = Pt(12)
    run = intro.add_run(
        "ACE Agent tests one idea: students are more likely to study consistently when their own course materials become a clear, adaptive path instead of another pile of information to organize."
    )
    set_font(run)
    run.font.size = Pt(12)

    doc.add_heading("Five ICP Questions", level=1)

    doc.add_heading("Who", level=2)
    add_body(doc, "The ideal customer has exactly three attributes:")
    add_numbered(doc, "A college student enrolled in a content-heavy course.")
    add_numbered(doc, "Their weekly work is spread across at least four sources, such as a syllabus, slides, notes, and an LMS.")
    add_numbered(doc, "They currently plan study sessions manually and often concentrate their studying near exams.")
    add_body(doc, "I am the first concrete example of this customer because the problem came from my own study workflow.")

    doc.add_heading("Against What", level=2)
    add_body(
        doc,
        "Students currently combine an LMS, folders of course files, a calendar, Quizlet, and general AI tools such as ChatGPT. Those tools can store content or answer individual prompts, but the student still has to decide what to study, provide context repeatedly, and judge whether an answer is grounded in the course material. ACE Agent turns the student's own syllabus and materials into one continuing study path that adapts after each quiz."
    )

    doc.add_heading("The First Ten", level=2)
    add_body(
        doc,
        "The first ten users will come from two content-heavy introductory courses through direct outreach to classmates and course GroupMe or Discord communities. I can contact these students this week, onboard them individually, and observe where the workflow breaks."
    )

    doc.add_heading("Price", level=2)
    add_body(
        doc,
        "The initial paid plan is $5 per month, or $60 in annual recurring revenue per student. Ten paying students would represent $600 in ARR. Direct outreach to existing class communities keeps acquisition costs low enough to test this price before considering broader campus partnerships."
    )

    doc.add_heading("Signal", level=2)
    add_body(
        doc,
        "Before Cycle 3, I will ask ten target students to use ACE Agent with one real course for seven days. The test succeeds if at least seven upload their materials and at least five complete three study sessions. If fewer than five return for a third session, I will pause the planned social and gamification features and redesign onboarding and the core study loop first."
    )

    doc.add_page_break()
    doc.add_heading("Problem and Evidence", level=1)
    add_body(
        doc,
        "The target user is a college student in a content-heavy course whose syllabus, lecture slides, notes, assignments, and deadlines are spread across several tools. Before studying, the student must reconstruct what matters, what is due, and what they understand least, which creates friction and encourages last-minute cramming. ACE Agent grew from my own experience spending study time organizing course information and repeatedly supplying context to disconnected study tools."
    )

    doc.add_heading("Originality and Differentiation", level=1)
    add_body(
        doc,
        "The key insight is that the problem is not access to more explanations; it is turning trusted course context into a study sequence that changes with the learner. Existing options such as LMS platforms, Quizlet, calendars, and general AI chat tools each solve part of the workflow. ACE Agent combines the student's syllabus, uploaded materials, schedule, and quiz performance to recommend the next lesson or practice session, while refusing to generate content when the source material is insufficient."
    )

    doc.add_heading("MVP and Product Decisions", level=1)
    doc.add_heading("Core Capabilities", level=2)
    add_bullet(doc, "Upload a syllabus and course materials, then organize topics by week.")
    add_bullet(doc, "Generate source-grounded lessons and quizzes for the selected week.")
    add_bullet(doc, "Use quiz results to emphasize weak topics in later practice.")

    doc.add_heading("Out of Scope", level=2)
    add_body(
        doc,
        "Leaderboards, peer connections, rewards, support for every course format, and university-wide integrations are outside this validation MVP. These ideas may improve motivation later, but they would make it harder to learn whether the adaptive study loop creates repeat use on its own."
    )

    doc.add_heading("Measurable Goals", level=2)
    add_bullet(doc, "Correctly assign at least 90 percent of week and topic headings across a test set of ten syllabi.")
    add_bullet(doc, "Return no generic lesson or quiz in twenty tests where the uploaded materials lack enough relevant context.")
    add_bullet(doc, "Have at least five of ten pilot users complete three study sessions within seven days.")

    doc.add_heading("Build Plan Tradeoffs and Risks", level=1)
    add_body(
        doc,
        "I will build on the existing Angular interface, Go API gateway, and Python AI service connected through gRPC. The MVP will parse syllabi, store class-specific material in Neo4j, retrieve relevant context for Gemini, and record quiz performance in BigQuery; its main dependencies are the quality of uploaded materials, model latency and cost, and secure separation of each user's classes. I am prioritizing the individual upload-to-study loop over leaderboards and peer features so the pilot isolates whether grounded personalization solves the core problem. The largest product risk is repeat use: the system may generate useful content but still fail to become part of a student's routine, which is why the seven-day return test is the deciding signal."
    )

    path = OUT / "ACE_Agent_Written_Pitch_Submission.docx"
    doc.save(path)
    return path


def build_script():
    doc = setup_document()
    add_title(doc, "ACE Agent Video Pitch Script", "Target length 2 to 3 minutes  |  One continuous take")

    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(14)
    run = p.add_run("Central idea")
    set_font(run)
    run.bold = True
    run.font.color.rgb = BLUE
    run = p.add_run(
        "  Students do not need another source of information. They need a trustworthy path through the information their course already gives them."
    )
    set_font(run)

    doc.add_heading("Pitch Script", level=1)

    script_paragraphs = [
        (
            "When I sit down to study for a difficult exam, my syllabus is in the course portal, lecture slides are saved as PDFs, my notes are somewhere else, and deadlines are in my calendar. I may also have ChatGPT open in another tab. Before I answer a single practice question, I have to decide what matters, gather the right context, and build a plan. That experience led me to a larger problem: students often do not lack learning resources. They lack a clear, trustworthy path through them."
        ),
        (
            "My initial customer is a college student in a content-heavy course, working from at least four different sources, who currently plans studying manually and often ends up cramming. Today, that student combines an LMS, folders, Quizlet, a calendar, and general AI tools. Each helps with one piece, but the student still has to connect everything and determine whether an AI answer matches the course."
        ),
        (
            "ACE Agent starts with the student's own syllabus and materials. It organizes the course into a weekly path, generates lessons and quizzes only when it has enough relevant source material, and uses quiz results to focus later practice on weaker topics. The important change is that the student no longer starts with a blank chat box or a blank study plan. The system already understands the structure of the class and recommends what to do next."
        ),
        (
            "I will find the first ten users through direct outreach to classmates and course GroupMe or Discord communities in two content-heavy introductory courses. The initial price is five dollars per month, which makes one student worth sixty dollars in annual recurring revenue and makes the first ten worth six hundred dollars in ARR. This channel lets me learn directly from users before spending money on wider acquisition."
        ),
        (
            "Before Cycle 3, I want ten students to use ACE Agent with one real course for seven days. My signal is that at least seven successfully upload their materials and at least five complete three study sessions. If fewer than five return for a third session, I will pause leaderboards and peer features and improve onboarding and the core study loop first. If they return, the next question is whether social accountability can turn useful studying into something students actually look forward to."
        ),
    ]

    for text in script_paragraphs:
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(11)
        p.paragraph_format.line_spacing = 1.18
        r = p.add_run(text)
        set_font(r)
        r.font.size = Pt(12)

    doc.add_heading("Delivery Notes", level=1)
    add_bullet(doc, "Speak conversationally and use the script as a guide rather than reading every line.")
    add_bullet(doc, "Pause after the opening example and after the seven-day test so the main idea lands.")
    add_bullet(doc, "At a natural pace, the script should run about two and a half minutes.")

    path = OUT / "ACE_Agent_Video_Pitch_Script.docx"
    doc.save(path)
    return path


if __name__ == "__main__":
    for artifact in (build_written(), build_script()):
        print(artifact)
