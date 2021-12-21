import conf from '../../assets/conf';
//import conf from '../../assets/confDev';

export class ConfigUtils {
    static getUrlFromEndPointName(endPointName){
        let endPoints= conf.filter(c=>c.name=='urlWebServices').shift();
        if(endPoints){
            let endPoint=endPoints.value.filter(ep=>ep.endPointName==endPointName).shift();
            if(endPoint)
                return endPoint.url;
        } 
        return null;
    }
}
