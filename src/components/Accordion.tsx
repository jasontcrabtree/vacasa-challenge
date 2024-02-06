import { AccordionItemType } from "@/types/types";
import { useState } from "react";

const Accordion = ({ accordionContent }: { accordionContent: Array<AccordionItemType> }) => {
    const [openId, setOpenId] = useState("");

    if (!accordionContent) {
        return null
    }

    return (
        <div>
            {accordionContent.map((accordionItem: AccordionItemType) => {
                return (
                    <div key={accordionItem.id}>
                        <button
                            id={accordionItem.id}
                            aria-controls={accordionItem.id}
                            onClick={() => setOpenId(accordionItem.id)}
                            aria-expanded={openId === accordionItem.id}
                            role="button"
                        >
                            {accordionItem.title}
                        </button>
                        {openId === accordionItem.id && (
                            <div id={accordionItem.id}>
                                {accordionItem.content}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Accordion;