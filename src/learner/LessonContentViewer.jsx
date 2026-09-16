function LessonContentViewer({ lesson }) {
    if (!lesson?.url) {
        return null;
    }

    return (
        <div className="mt-3 border rounded overflow-hidden">
            <iframe
                src={lesson.url}
                title={`${lesson.title} lesson content`}
                className="w-100"
                style={{ minHeight: "420px", border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

export default LessonContentViewer;
