import { useState } from "react";

const Accordion = ({ accordionContent }) => {
    const [open, setOpen] = useState(false);

    if (!accordionContent) {
        return null
    }

    return (
        <div>
            {accordionContent.map((accordionItem) => {
                return (
                    <div key={accordionItem.id}>
                        <button
                            onClick={() => setOpen(!open)}
                            aria-expanded={open}
                            aria-controls={accordionItem.id}
                            id={accordionItem.id}
                            role="button"
                        >
                            {accordionItem.title}
                        </button>
                        <div id={accordionItem.id}>
                            {accordionItem.content}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Accordion;
