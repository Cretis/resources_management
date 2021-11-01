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
        const loadAllResourcesUrl="http://localhost:8080/resources/all"
        let allResource = [];
        let addedResource=[]
        const loadAddedResourcesUrl="http://localhost:8080/project/getprojectresources"
        axios.get(loadAllResourcesUrl,{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}}).then(response=>{
            const resourceList = response.data;
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
                    dispatch(loadAll(projectId));
                }
            }
        )

    }
}

export const deleteFromTable=(resourceList)=>{
    return{
        type:actionType.delete_from_table,
        resourceList:resourceList
    }
}

export const deleteResource=(resourceList,projectId)=>{
    return dispatch=>{
        const deleteResourceUrl="http://localhost:8080/project//removeResources"
        let resourceIdList=[];
        resourceList.forEach(resource=>{
            resourceIdList.push(resource.resourceId)
        })
        axios.delete(deleteResourceUrl,{headers: {"Authorization": "Bearer " + localStorage.getItem("token")},data:{resources:resourceIdList,projectId:projectId}}).then(
            response=>{
                if(response.data==="delete successful"){
                    dispatch(loadAll(projectId));
                }

            }
        ).catch(err=>{
            console.log(err)
        })
    }
}

