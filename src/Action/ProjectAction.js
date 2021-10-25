import * as actionType from "./ActionType"
import axios from "axios";


export const loadAllSuccess=(allResources,addedResources)=>{
    return{
        type:actionType.load_All_Resources_On_Project_Page_Success,
        allResource:allResources,
        addedResource:addedResources
    }
}

export const loadAll= (projectId)=>{
    return dispatch=>{
        console.log("in loadAll")
        console.log(projectId);
        const loadAllResourcesUrl="http://localhost:8080/resources/all"
        const allResource = []
        axios.get(loadAllResourcesUrl,{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}}).then(response=>{
            const resourceList = response.data;
            resourceList.forEach(resource=>{
                allResource.push({
                    name:resource.resourceName,
                    id:resource.resourceId
                })
            })
        })
        const addedResource=[]
        const loadAddedResourcesUrl="http://localhost:8080/project/getprojectresources"
        axios.get(loadAddedResourcesUrl,{headers: {"Authorization": "Bearer " + localStorage.getItem("token")},params:{projectId:projectId}}).then(response=>{
            const addedResourceList = response.data;
            addedResourceList.forEach(resource=>{
                addedResource.push({
                    name:resource.resourceName,
                    id:resource.resourceId
                })
            })
        }).catch(err=>{
            console.log(err)
        })
        console.log(allResource)
        console.log(addedResource)
        dispatch(loadAllSuccess(allResource,addedResource))
    }
}

export const loadProjectSuccess=(projectList)=>{
    return{
        type:actionType.load_All_Project_Success,
        projectList:projectList
    }
}

export const loadProject=(username)=>{
    return dispatch=>{
        const loadProjectUrl="http://localhost:8080/project/findbyuser";
        const allProject=[];
        axios.get(loadProjectUrl,{headers: {"Authorization": "Bearer " + localStorage.getItem("token")},params:{username:username}}).then(response=>{
            const projectList = response.data;
            projectList.forEach(project=>{
                allProject.push(project);
            })
            console.log("allproject:")
            console.log(allProject)
            dispatch(loadProjectSuccess(allProject));
            dispatch(loadAll(allProject[0].projectId));

        }).catch(err=>{
            console.log(err);
        })

    }

}
