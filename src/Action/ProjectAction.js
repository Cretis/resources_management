import * as actionType from "./ActionType"
import axios from "axios";


export const loadAllSuccess=(allResources,addedResources)=>{
    console.log("inloadALlSuccess");
    console.log(allResources)
    console.log(allResources[0])
    return{
        type:actionType.load_All_Resources_On_Project_Page_Success,
        allResource:allResources,
        addedResource:addedResources
    }
}

export const loadAll= (projectId)=>{
    return dispatch=>{
        const loadAllResourcesUrl="http://localhost:8080/resources/all"
        let allResource = [];
        let addedResource=[]
        const loadAddedResourcesUrl="http://localhost:8080/project/getprojectresources"
        axios.get(loadAllResourcesUrl,{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}}).then(response=>{
            const resourceList = response.data;
            console.log("response:")
            console.log(resourceList)
            resourceList.map(resource=>{
                // allResource.push({
                //     name:resource.resourceName,
                //     id:resource.resourceId
                // })
                return(
                    allResource=[
                        ...allResource,
                        {
                            name:resource.resourceName,
                            id:resource.resourceId
                        }
                    ]
                )
            });
            axios.get(loadAddedResourcesUrl,{headers: {"Authorization": "Bearer " + localStorage.getItem("token")},params:{projectId:projectId}}).then(response=>{
                const addedResourceList = response.data;
                addedResourceList.forEach(resource=>{
                    addedResource.push({
                        name:resource.resourceName,
                        id:resource.resourceId
                    })
                })
                console.log("inLoadAll")
                console.log(addedResource)
                dispatch(loadAllSuccess(allResource,addedResource))
            }).catch(err=>{
                console.log(err)
            })
        });
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


export const addResource=(resourceList,projectId)=>{
    return dispatch=>{
        let resourceIdList=[];
        resourceList.forEach(resource=>{
            resourceIdList.push(resource.resourceId);
        })

        const addResourceUrl="http://localhost:8080/project/addresources"
        axios.post(addResourceUrl,{resources:resourceIdList,projectId:projectId},{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}}).then(
            response=>{
                if(response.data==="add Successful"){
                    console.log("before loadAll")
                    dispatch(loadAll(projectId));
                }
            }
        )

    }
}
