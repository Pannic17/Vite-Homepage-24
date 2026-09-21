export function failure(code){return Object.assign(new Error(code),{code});}
const codes=['url','config','json','network','local','storage','effects','timeout','resource'];
export function errorKey(error){return 'kaiwuViewer.errors.'+(codes.includes(error?.code)?error.code:'resource');}
export function parseConfig(text){try{return JSON.parse(text);}catch{throw failure('json');}}
