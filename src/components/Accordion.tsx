import { useState } from "react";
import { AccordionItemType } from "@/types/types";
import styles from '@/styles/accordion.module.css'

const Accordion = ({ accordionContent }: { accordionContent: Array<AccordionItemType> }) => {
    const [openId, setOpenId] = useState("");

    if (!accordionContent) {
        return null
    }

    return (
        <div className={styles.wrapper}>
            {accordionContent.map((accordionItem: AccordionItemType) => {
                return (
                    <div className={styles.item} key={accordionItem.id}>
                        <button
                            className={styles.button}
                            id={accordionItem.id}
                            aria-controls={accordionItem.id}
                            onClick={() => {
                                if (openId === accordionItem.id) {
                                    setOpenId("")
                                } else {
                                    setOpenId(accordionItem.id)
                                }
                            }}
                            aria-expanded={openId === accordionItem.id}
                            role="button"
                        >
                            {accordionItem.title}
                            {openId === accordionItem.id
                                ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--tw-grey-400)" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--tw-grey-400)" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>
                                )}
                        </button>
                        {openId === accordionItem.id && (
                            <div className={styles.itemContent} id={accordionItem.id}>
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