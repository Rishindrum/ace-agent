from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)


ROOT = Path(r"C:\Users\Rindr\OneDrive\Documents\Projects\ace-agent")
OUT = ROOT / "output" / "pitch"
OUT.mkdir(parents=True, exist_ok=True)

INK = colors.HexColor("#15171A")
MUTED = colors.HexColor("#5A6470")
BLUE = colors.HexColor("#2F61A8")
LIGHT_BLUE = colors.HexColor("#EAF1FB")


def register_fonts():
    font_candidates = [
        ("Aptos", r"C:\Windows\Fonts\aptos.ttf"),
        ("Aptos-Bold", r"C:\Windows\Fonts\aptos-bold.ttf"),
        ("Arial", r"C:\Windows\Fonts\arial.ttf"),
        ("Arial-Bold", r"C:\Windows\Fonts\arialbd.ttf"),
    ]
    found = {}
    for name, path in font_candidates:
        if Path(path).exists():
            pdfmetrics.registerFont(TTFont(name, path))
            found[name] = name
    if "Aptos" in found and "Aptos-Bold" in found:
        return "Aptos", "Aptos-Bold"
    return "Arial", "Arial-Bold"


REGULAR, BOLD = register_fonts()


def styles():
    sample = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "PitchTitle",
            parent=sample["Title"],
            fontName=BOLD,
            fontSize=25,
            leading=29,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=8,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=sample["Normal"],
            fontName=REGULAR,
            fontSize=9.5,
            leading=12,
            textColor=MUTED,
            spaceAfter=15,
        ),
        "intro": ParagraphStyle(
            "Intro",
            parent=sample["Normal"],
            fontName=REGULAR,
            fontSize=12,
            leading=17,
            textColor=INK,
            spaceAfter=13,
        ),
        "h1": ParagraphStyle(
            "HeadingOne",
            parent=sample["Heading1"],
            fontName=BOLD,
            fontSize=16.5,
            leading=20,
            textColor=INK,
            spaceBefore=13,
            spaceAfter=7,
            keepWithNext=True,
        ),
        "h2": ParagraphStyle(
            "HeadingTwo",
            parent=sample["Heading2"],
            fontName=BOLD,
            fontSize=12.5,
            leading=15,
            textColor=INK,
            spaceBefore=9,
            spaceAfter=4,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=sample["BodyText"],
            fontName=REGULAR,
            fontSize=10.6,
            leading=14.6,
            textColor=INK,
            spaceAfter=7,
        ),
        "script": ParagraphStyle(
            "Script",
            parent=sample["BodyText"],
            fontName=REGULAR,
            fontSize=12,
            leading=17.2,
            textColor=INK,
            spaceAfter=11,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=sample["BodyText"],
            fontName=REGULAR,
            fontSize=9.7,
            leading=13.4,
            textColor=INK,
        ),
    }


ST = styles()


def header_footer(canvas, doc, label):
    canvas.saveState()
    width, _ = letter
    canvas.setStrokeColor(colors.HexColor("#D7DEE8"))
    canvas.setLineWidth(0.6)
    canvas.line(0.78 * inch, 0.57 * inch, width - 0.78 * inch, 0.57 * inch)
    canvas.setFillColor(MUTED)
    canvas.setFont(REGULAR, 8.2)
    canvas.drawString(0.78 * inch, 0.36 * inch, label)
    canvas.drawRightString(width - 0.78 * inch, 0.36 * inch, str(doc.page))
    canvas.restoreState()


def make_doc(path, label):
    doc = BaseDocTemplate(
        str(path),
        pagesize=letter,
        rightMargin=0.82 * inch,
        leftMargin=0.82 * inch,
        topMargin=0.68 * inch,
        bottomMargin=0.72 * inch,
        title=label,
        author="",
        subject="ACE Agent pitch submission",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="body")
    template = PageTemplate(id="pitch", frames=[frame], onPage=lambda c, d: header_footer(c, d, label))
    doc.addPageTemplates([template])
    return doc


def title_block(title, meta):
    return [Paragraph(title, ST["title"]), Paragraph(meta, ST["meta"])]


def bullets(items, numbered=False, style=None):
    pstyle = style or ST["body"]
    kwargs = {
        "bulletType": "1" if numbered else "bullet",
        "leftIndent": 20,
        "bulletFontName": REGULAR,
        "bulletFontSize": 9,
        "spaceBefore": 1,
        "spaceAfter": 7,
    }
    if numbered:
        kwargs["start"] = "1"
    else:
        kwargs["bulletColor"] = BLUE
        kwargs["start"] = "-"
    return ListFlowable(
        [ListItem(Paragraph(item, pstyle), leftIndent=8) for item in items],
        **kwargs,
    )


def h1(text):
    return Paragraph(text, ST["h1"])


def h2(text):
    return Paragraph(text, ST["h2"])


def body(text):
    return Paragraph(text, ST["body"])


def build_written():
    path = OUT / "ACE_Agent_Written_Pitch_Submission.pdf"
    doc = make_doc(path, "ACE Agent Written Pitch Submission")
    story = []
    story += title_block("ACE Agent Written Pitch Submission", "Pitch to Prototype  |  Fall 2026")
    story.append(Paragraph(
        "ACE Agent tests one idea: students are more likely to study consistently when their own course materials become a clear, adaptive path instead of another pile of information to organize.",
        ST["intro"],
    ))

    story.append(h1("Five ICP Questions"))
    story.append(h2("Who"))
    story.append(body("The ideal customer has exactly three attributes:"))
    story.append(bullets([
        "A college student enrolled in a content-heavy course.",
        "Their weekly work is spread across at least four sources, such as a syllabus, slides, notes, and an LMS.",
        "They currently plan study sessions manually and often concentrate their studying near exams.",
    ], numbered=True))
    story.append(body("I am the first concrete example of this customer because the problem came from my own study workflow."))

    story.append(h2("Against What"))
    story.append(body(
        "Students currently combine an LMS, folders of course files, a calendar, Quizlet, and general AI tools such as ChatGPT. Those tools can store content or answer individual prompts, but the student still has to decide what to study, provide context repeatedly, and judge whether an answer is grounded in the course material. ACE Agent turns the student's own syllabus and materials into one continuing study path that adapts after each quiz."
    ))

    story.append(h2("The First Ten"))
    story.append(body(
        "The first ten users will come from two content-heavy introductory courses through direct outreach to classmates and course GroupMe or Discord communities. I can contact these students this week, onboard them individually, and observe where the workflow breaks."
    ))

    story.append(h2("Price"))
    story.append(body(
        "The initial paid plan is $5 per month, or $60 in annual recurring revenue per student. Ten paying students would represent $600 in ARR. Direct outreach to existing class communities keeps acquisition costs low enough to test this price before considering broader campus partnerships."
    ))

    story.append(h2("Signal"))
    story.append(body(
        "Before Cycle 3, I will ask ten target students to use ACE Agent with one real course for seven days. The test succeeds if at least seven upload their materials and at least five complete three study sessions. If fewer than five return for a third session, I will pause the planned social and gamification features and redesign onboarding and the core study loop first."
    ))

    story.append(PageBreak())
    story.append(h1("Problem and Evidence"))
    story.append(body(
        "The target user is a college student in a content-heavy course whose syllabus, lecture slides, notes, assignments, and deadlines are spread across several tools. Before studying, the student must reconstruct what matters, what is due, and what they understand least, which creates friction and encourages last-minute cramming. ACE Agent grew from my own experience spending study time organizing course information and repeatedly supplying context to disconnected study tools."
    ))

    story.append(h1("Originality and Differentiation"))
    story.append(body(
        "The key insight is that the problem is not access to more explanations; it is turning trusted course context into a study sequence that changes with the learner. Existing options such as LMS platforms, Quizlet, calendars, and general AI chat tools each solve part of the workflow. ACE Agent combines the student's syllabus, uploaded materials, schedule, and quiz performance to recommend the next lesson or practice session, while refusing to generate content when the source material is insufficient."
    ))

    story.append(h1("MVP and Product Decisions"))
    story.append(h2("Core Capabilities"))
    story.append(bullets([
        "Upload a syllabus and course materials, then organize topics by week.",
        "Generate source-grounded lessons and quizzes for the selected week.",
        "Use quiz results to emphasize weak topics in later practice.",
    ]))
    story.append(h2("Out of Scope"))
    story.append(body(
        "Leaderboards, peer connections, rewards, support for every course format, and university-wide integrations are outside this validation MVP. These ideas may improve motivation later, but they would make it harder to learn whether the adaptive study loop creates repeat use on its own."
    ))
    story.append(h2("Measurable Goals"))
    story.append(bullets([
        "Correctly assign at least 90 percent of week and topic headings across a test set of ten syllabi.",
        "Return no generic lesson or quiz in twenty tests where the uploaded materials lack enough relevant context.",
        "Have at least five of ten pilot users complete three study sessions within seven days.",
    ]))

    story.append(h1("Build Plan Tradeoffs and Risks"))
    story.append(body(
        "I will build on the existing Angular interface, Go API gateway, and Python AI service connected through gRPC. The MVP will parse syllabi, store class-specific material in Neo4j, retrieve relevant context for Gemini, and record quiz performance in BigQuery; its main dependencies are the quality of uploaded materials, model latency and cost, and secure separation of each user's classes. I am prioritizing the individual upload-to-study loop over leaderboards and peer features so the pilot isolates whether grounded personalization solves the core problem. The largest product risk is repeat use: the system may generate useful content but still fail to become part of a student's routine, which is why the seven-day return test is the deciding signal."
    ))

    doc.build(story)
    return path


def build_script():
    path = OUT / "ACE_Agent_Video_Pitch_Script.pdf"
    doc = make_doc(path, "ACE Agent Video Pitch Script")
    story = []
    story += title_block("ACE Agent Video Pitch Script", "Target length 2 to 3 minutes  |  One continuous take")
    story.append(Paragraph(
        '<font color="#2F61A8"><b>Central idea</b></font>  Students do not need another source of information. They need a trustworthy path through the information their course already gives them.',
        ST["intro"],
    ))
    story.append(h1("Pitch Script"))

    paragraphs = [
        "When I sit down to study for a difficult exam, my syllabus is in the course portal, lecture slides are saved as PDFs, my notes are somewhere else, and deadlines are in my calendar. I may also have ChatGPT open in another tab. Before I answer a single practice question, I have to decide what matters, gather the right context, and build a plan. That experience led me to a larger problem: students often do not lack learning resources. They lack a clear, trustworthy path through them.",
        "My initial customer is a college student in a content-heavy course, working from at least four different sources, who currently plans studying manually and often ends up cramming. Today, that student combines an LMS, folders, Quizlet, a calendar, and general AI tools. Each helps with one piece, but the student still has to connect everything and determine whether an AI answer matches the course.",
        "ACE Agent starts with the student's own syllabus and materials. It organizes the course into a weekly path, generates lessons and quizzes only when it has enough relevant source material, and uses quiz results to focus later practice on weaker topics. The important change is that the student no longer starts with a blank chat box or a blank study plan. The system already understands the structure of the class and recommends what to do next.",
        "I will find the first ten users through direct outreach to classmates and course GroupMe or Discord communities in two content-heavy introductory courses. The initial price is five dollars per month, which makes one student worth sixty dollars in annual recurring revenue and makes the first ten worth six hundred dollars in ARR. This channel lets me learn directly from users before spending money on wider acquisition.",
        "Before Cycle 3, I want ten students to use ACE Agent with one real course for seven days. My signal is that at least seven successfully upload their materials and at least five complete three study sessions. If fewer than five return for a third session, I will pause leaderboards and peer features and improve onboarding and the core study loop first. If they return, the next question is whether social accountability can turn useful studying into something students actually look forward to.",
    ]
    for paragraph in paragraphs:
        story.append(Paragraph(paragraph, ST["script"]))

    doc.build(story)
    return path


if __name__ == "__main__":
    for file in (build_written(), build_script()):
        print(file)
