function ModuleAccordionItem({ id, title, description }) {
    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button 
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${id}`}>
                            {title}
                    </button>
                </h2>
                <div 
                    id={`collapse${id}`} 
                    className="accordion-collapse collapse" 
                    data-bs-parent="#moduleAccordion">
                    <div className="accordion-body">
                        {description}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModuleAccordionItem;