import * as actionType from "./ActionType"
import axios from "axios";


const loadColumnSuccessful=(projectColumnList)=>{
    return{
        type:actionType.load_Column_Successful,
        projectColumnList:projectColumnList
    }
}

export const loadALlColumns = (currentProject)=> {
    return dispatch => {
        const loadAllColumnsUrl = "http://localhost:8080/project/columns"
        const loadResourceUrl = "http://localhost:8080/resources/project"
        const resourceDetailUrl = "http://localhost:8080/resources/allResourceDetail";
        let finalList = [];

        function getColumns() {
            return axios.get(loadAllColumnsUrl, {
                headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
                params: {ProjectId: currentProject.projectId}
            });
        }

        function getResources() {
            return axios.get(loadResourceUrl, {
                headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
                params: {projectId: currentProject.projectId}
            });

        }

        function getResourceDetail() {
            return axios.get(resourceDetailUrl, {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}});
        }

        axios.all([getColumns(), getResources(), getResourceDetail()]).then(axios.spread((columnResponse, resourceResponse, resourceDetailResponse) => {
            console.log("in axios all")
            const projectColumnList = columnResponse.data;
            let resourceList = resourceResponse.data;
            const resourceDetailList = resourceDetailResponse.data;
            resourceList = resourceList.map(resource => {
                let newColumn=[];
                projectColumnList.forEach(column=>{
                    newColumn.push({
                        columnId:column.columnId,
                        project:column.project,
                        columnName:column.columnName,
                        type:column.type,
                        formulaText:column.formulaText,
                        show:true
                    })
                })
                return {
                    ...resource,
                    column: [...newColumn]
                }
            })
            resourceList.forEach(resource=>{
                resourceDetailList.forEach(detail=>{
                    if(resource.resourceId===detail.resource.resourceId){
                        resource.column.forEach(column=>{
                            if(column.columnId===detail.column.columnId){
                                column.columnValue=detail.columnValue;
                            }
                        })
                    }
                })
            })
            finalList=[...resourceList]
            console.log(finalList)
            dispatch(loadColumnSuccessful(finalList))
        }))


    }
}

const readColumnSuccessful=(columnList)=>{
    return{
        type:actionType.load_Only_Column_Successful,
        columnList:columnList
    }
}

export const loadProjectColumn=(currentProject)=>{
    return dispatch=>{
        const loadAllColumnsUrl = "http://localhost:8080/project/columns"
        axios.get(loadAllColumnsUrl, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            params: {ProjectId: currentProject.projectId}
        }).then(response=>{
            const columnList=response.data;
            dispatch(readColumnSuccessful(columnList))
        }).catch(err=>{
            console.log(err);
        })
    }

}

export const changeShowStatus=(columnId)=>{
    return{
        type:actionType.change_show_column,
        columnId:columnId
    }
}

const addSuccess=(returnList)=>{
    return {
        type:actionType.add_successful,
        returnList:returnList
    }
}

export const addColumns=(nameList,project)=>{
    return dispatch=>{
        const addColumnRul="http://localhost:8080/resources/addColumns"
        axios.put(addColumnRul,{columns:nameList,project:project},{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}}).then(response=>{
            console.log("successful")
            const returnList = response.data;
            console.log(returnList);
            dispatch(addSuccess(returnList))
        })
    }
}

