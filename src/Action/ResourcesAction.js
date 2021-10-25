import axios from "axios";
import * as actionType from "./ActionType"


export const loadAllResourcesErr = (err) => {
    return {
        type: actionType.load_All_Resources_Err,
        err: err
    }
}

export const loadSuccess = (ResourceList) => {
    return {
        type: actionType.load_Success,
        resources: ResourceList
    }
}

export const loadProjectColumnErr = (err) => {
    return {
        type: actionType.load_ProjectColumn_Err,
        err: err
    }
}

export const loadResourceDetailErr = (err) => {
    return {
        type: actionType.load_ResourceDetail_Err,
        err: err
    }
}

export const loadAllResources = () => {
    return dispatch => {
        const resourceUrl = "http://localhost:8080/resources/all";
        const projectColumnUrl = "http://localhost:8080/project/columns";
        const resourceDetailUrl = "http://localhost:8080/resources/allResourceDetail";
        const projectId = 0;
        let finalResourceList = [];

        function getAllResources() {
            return axios.get(resourceUrl, {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}});
        }

        function getProjectColumn() {
            return axios.get(projectColumnUrl, {
                params: {ProjectId: projectId},
                headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
            });
        }

        function getResourceDetail() {
            return axios.get(resourceDetailUrl, {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}});
        }

        axios.all([getAllResources(), getProjectColumn(), getResourceDetail()]).then(axios.spread((resourceResponse, projectColumnResponse, resourceDetailResponse) => {
            const ResourceList = resourceResponse.data
            // console.log("resourceList:")
            // console.log(ResourceList)
            ResourceList.map(resource => {
                    return (
                        finalResourceList = [
                            ...finalResourceList,
                            {
                                id: resource.resourceId,
                                name: resource.resourceName,
                                columns: []
                            }
                        ]
                    )
                }
            );
            // console.log("finalResourceList after all resources")
            // console.log(finalResourceList);
            const projectColumnList = projectColumnResponse.data;
            // console.log("projectColumnList:")
            // console.log(projectColumnList)
            let columnsList = [];
            projectColumnList.forEach(projectColumn => {
                columnsList.push({
                    columnId: projectColumn.columnId,
                    columnName: projectColumn.columnName,
                    columnValue: null,
                })
            })

            // columnsList=projectColumnList.map(projectColumn => {
            //     return (
            //         columnsList.concat([{
            //             columnId: projectColumn.columnId,
            //             columnName: projectColumn.columnName,
            //             columnValue: "1"
            //         }])

            // columnsList=[
            //     ...columnsList,
            //     {
            //         columnId: projectColumn.columnId,
            //         columnName: projectColumn.columnName,
            //         columnValue: "1"
            //     }
            // ]
            // )
            // })
            // console.log("columnList")
            // console.log(columnsList)

            finalResourceList = finalResourceList.map(resource => {
                let newList = new Array(columnsList.length)
                for (let key in columnsList) {
                    newList[key] = {
                        columnId: columnsList[key].columnId,
                        columnName: columnsList[key].columnName,
                        columnValue: null,
                    }
                }
                return (
                    {
                        ...resource,
                        columns: newList
                        // columns: JSON.parse(JSON.stringify(columnsList))
                    })
            })

            // console.log("finalResourceList after project column")
            // console.log(finalResourceList)
            const resourceDetailList = resourceDetailResponse.data;
            // console.log("resourceDetailList:")
            // console.log(resourceDetailList)
            finalResourceList.forEach(resource => {
                resource.columns.forEach(column => {
                    const c = resourceDetailList.find(resourceDetail => resourceDetail.column.columnId === column.columnId && resourceDetail.resource.resourceId === resource.id)
                    if (c !== undefined) {
                        console.log(resource);
                        console.log(column);
                        column.columnValue = c.columnValue
                    } else {
                        column.columnValue = null
                    }
                })
            })
            // console.log("finalResourceList:")
            // console.log(finalResourceList)
            dispatch(loadSuccess(finalResourceList))
        })).catch(err => {
            dispatch(loadResourceDetailErr(err))
        })
    }
}

export const updateSuccess=(resourceId,columnId,value)=>{
    return{
        type:actionType.add_Column_Value_Success,
        updateResource:{
            resourceId:resourceId,
            columnId:columnId,
            value:value
        }
    }
}

export const addColumnValue=(resourceId,columnId,value)=>{
    return dispatch=>{
        const addColumnValueUrl = "http://localhost:8080/resources/updateOrAddColumnValue"
        // console.log("columnValuedata:")
        // console.log(resourceId);
        // console.log(columnId);
        // console.log(value)
        axios.put(addColumnValueUrl,{
            columnValue:value,
            columnId:columnId,
            resourceId:resourceId
        },{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}}).then(response=>{
            if(response.data==="Successfully updated"){
                dispatch(updateSuccess(resourceId,columnId,value))
            }
        }).catch(err=>{
            console.log(err);
        })
    }

}

export const search=(searchValue)=>{
    return{
        type:actionType.Search,
        searchValue:searchValue
    }
}

export const addColumnName=(columnName)=>{
    return dispatch=>{
        const addColumnNameUrl = "http://localhost:8080/resources/addColumn"
        axios.put(addColumnNameUrl,{columnName:columnName,projectId:0},{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}}).then(response=>{
            if(response.data==="Successfully added"){
                dispatch(loadAllResources());
            }
        }).catch(err=>{
            console.log(err);
        })
    }

}

export const updateColumnName=(columnId,columnName)=>{
    return dispatch=>{
        const updateColumnNameUrl = "http://localhost:8080/resources/updateColumnName"
        axios.put(updateColumnNameUrl,{columnId:columnId,columnName:columnName},{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}}).then(response=>{
            if(response.data==="update Successfully"){
                dispatch(loadAllResources());
            }
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const deleteColumn = (columnId)=>{
    return dispatch=>{
        const deleteColumnUrl = "http://localhost:8080/resources/deleteColumn"
        axios.delete(deleteColumnUrl,{headers: {"Authorization": "Bearer " + localStorage.getItem("token")},params:{columnId:columnId}}).then(response=>{
            if(response.data==="delete Successfully"){
                dispatch(loadAllResources());
            }
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const addRow=(resourceId,resourceName)=>{
    return dispatch=>{
        const addRowUrl="http://localhost:8080/resources/add"
        axios.put(addRowUrl,{resourceId:resourceId,resourceName:resourceName},{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}}).then(response=>{
            if(response.data==="Successfully added"){
                dispatch(loadAllResources());
            }
        }).catch(err=>{
            console.log(err);
        })
    }
}