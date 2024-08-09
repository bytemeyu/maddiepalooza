import React, { useState, useEffect} from "react";
import { Stage } from "../types/stage";
import { StagesListProps } from "../types/stagesList";
import { twMerge } from "tailwind-merge";

export const StagesList = ({liClassName, className, children, ...rest }: StagesListProps) => {
    const [stages, setStages] = useState<Stage[]>([]);

    useEffect(() => {
        async function fetchStages() {
            try {
                const response = await fetch('http://localhost:3000/api/stage');
                const jsonResponse = await response.json();
                setStages(jsonResponse.data as Stage[]);
            } catch (error) {
                console.error('Error fetching stages:', error);
            }
        }

        fetchStages();
    }, []);

    const stagesListClasses = 'flex justify-center items-center';
    const ulClasses = 'text-center';
    const liClasses = 'flex justify-center items-center my-6';
    const pStageNameClasses = 'text-center font-extrabold';
    const pClasses = 'text-center';

    return (
        <div {...rest} className={twMerge(stagesListClasses, className)}>
            <ul className={ulClasses}>
                {stages.map(stage => (
                    <li key={stage.stage_id} className={twMerge(liClasses, liClassName)}>
                        <div>
                            <p className={pStageNameClasses}>
                                {stage.name}
                            </p>
                            <p className={pClasses}>
                                {stage.location}
                            </p>
                            <p className={pClasses}>
                                Capacidade: {stage.capacity} pessoas
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      );
}