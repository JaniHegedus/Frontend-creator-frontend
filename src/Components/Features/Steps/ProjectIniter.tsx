import React, { useState, useEffect } from 'react';
import Inputfield from "@/Components/Common/Inputfield";
import PageCount from "@/Components/Features/Steps/PageCount";
import {ProjectIniterProps} from "@/Components/InterFaces/Steps/ProjectIniterProps"; 

const ProjectIniter = ({nextStep,pageCount,setPageCount, setProject, project } : ProjectIniterProps) => {
    const [Name, setName] = useState<string | null>(project.projectName);
    const [Description, setDescription] = useState<string | null>(project.projectDescription);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleProjectName = (value: string) => {
        setName(value);
        setProject(value,Description? Description: "");
    };

    const handleProjectDescription = (value: string) => {
        setDescription(value);
        setProject(Name? Name : "",value);
    };

    useEffect(() => {
        // Enable the Next button if both selections have been made
        if(Name && Name.length>4)
        {
            setIsDisabled(false);
        }
    }, [Name]);
    useEffect(() => {
         setName(project.projectName);
        setDescription(project.projectDescription);
    }, [project]);
    return (
        <>
            <div>
                <Inputfield
                    type="text"
                    onChange={handleProjectName}
                    placeholder="Project Name"
                    value={Name ? Name : ""}
                    required
                    minLength={5}
                    maxLength={20}
                />
                <Inputfield
                    type="text"
                    onChange={handleProjectDescription}
                    placeholder="Project Description"
                    value={Description ? Description : ""}
                    maxLength={250}
                />
            </div>
            <h2 className={"text-lg font-bold mb-4"}>Choose Page Count</h2>
            <PageCount
                nextStep={nextStep}
                pageCount={pageCount}
                setPageCount={setPageCount}
                disabled={isDisabled}
            />
        </>
    );
}

export default ProjectIniter;
