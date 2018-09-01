import { CONFIG } from "./config";

export const API = {
    'userAPI' : (CONFIG.backend_url + 'user'),   
    'loginAPI' : (CONFIG.backend_url + 'login'), 
    'backendstatusAPI' : (CONFIG.backend_url + 'backend'), 
    'eniDBstatusAPI' : (CONFIG.backend_url + 'enidbstatus'), 
    'erpDBstatusAPI' : (CONFIG.backend_url + 'erpstatus'), 
};