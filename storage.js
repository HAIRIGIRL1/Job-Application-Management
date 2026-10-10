/* Applicant data and Local Storage helpers for the JAMS demo. */
(function(){
 const KEY='jams_applicants_v1', LOG='jams_activity_v1', SETTINGS='jams_settings_v1';
 const seed=[
  {id:1,name:'Jordan Davis',email:'jordan.davis@example.com',phone:'09171234567',education:'BS Information Technology',school:'Metro City University',skills:'HTML, CSS, JavaScript, Git',experience:'1 year as a junior web developer',position:'Web Developer',status:'Under Review',dateApplied:'2026-10-01',createdAt:'2026-10-01T09:00:00.000Z'},
  {id:2,name:'Emma Wilson',email:'emma.wilson@example.com',phone:'09181234567',education:'BS Multimedia Arts',school:'Northview College',skills:'Figma, UI Design, Prototyping, UX Research',experience:'6-month design internship',position:'UI/UX Designer',status:'Interview',dateApplied:'2026-10-03',createdAt:'2026-10-03T10:30:00.000Z'},
  {id:3,name:'Liam Chen',email:'liam.chen@example.com',phone:'09191234567',education:'BS Computer Science',school:'Eastbridge University',skills:'SQL, Python, Excel, Data Visualization',experience:'Entry-level; academic data analysis projects',position:'Data Analyst',status:'Hired',dateApplied:'2026-10-04',createdAt:'2026-10-04T08:15:00.000Z'},
  {id:4,name:'Maria Santos',email:'maria.santos@example.com',phone:'09201234567',education:'BS Information Technology',school:'Pasig City College',skills:'Troubleshooting, Networking, Windows, Customer Support',experience:'1 year IT support practicum',position:'IT Support Specialist',status:'Applied',dateApplied:'2026-10-06',createdAt:'2026-10-06T12:00:00.000Z'}
 ];
 function read(key,fallback){try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback}catch(e){return fallback}}
 window.JAMS={
  getApplicants(){let a=read(KEY,null);if(!Array.isArray(a)){a=seed.slice();localStorage.setItem(KEY,JSON.stringify(a))}return a},
  saveApplicants(a){localStorage.setItem(KEY,JSON.stringify(a))},
  getApplicant(id){return this.getApplicants().find(a=>String(a.id)===String(id))},
  nextId(){return this.getApplicants().reduce((m,a)=>Math.max(m,Number(a.id)||0),0)+1},
  addApplicant(data){const a=this.getApplicants();const item={...data,id:this.nextId(),createdAt:new Date().toISOString()};a.unshift(item);this.saveApplicants(a);this.addActivity('Applicant added',item.name+' was added for '+item.position+'.');return item},
  updateApplicant(id,data){const a=this.getApplicants(),i=a.findIndex(x=>String(x.id)===String(id));if(i<0)return null;const old=a[i];a[i]={...old,...data,id:old.id,createdAt:old.createdAt};this.saveApplicants(a);this.addActivity('Applicant updated',a[i].name+' applicant record was updated.');return a[i]},
  deleteApplicant(id){const a=this.getApplicants(),item=a.find(x=>String(x.id)===String(id));if(!item)return false;this.saveApplicants(a.filter(x=>String(x.id)!==String(id)));this.addActivity('Applicant deleted',item.name+' was removed from applicant records.');return true},
  addActivity(title,message){const a=read(LOG,[]);a.unshift({id:Date.now(),title,message,date:new Date().toISOString()});localStorage.setItem(LOG,JSON.stringify(a.slice(0,40)))},
  getActivity(){return read(LOG,[])},clearActivity(){localStorage.setItem(LOG,'[]')},
  getSettings(){return read(SETTINGS,{adminName:'Admin',adminEmail:'admin@example.com',companyName:'ABC Technology Solutions',defaultStatus:'Applied'})},
  saveSettings(s){localStorage.setItem(SETTINGS,JSON.stringify(s))},
  reset(){localStorage.removeItem(KEY);localStorage.removeItem(LOG);localStorage.removeItem(SETTINGS);this.getApplicants()}
 };
})();