import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
export const root=import.meta.dirname;
export const dataDir=process.env.DATA_DIR||path.join(root,'var');fs.mkdirSync(dataDir,{recursive:true});
export const db=new DatabaseSync(path.join(dataDir,'sano.sqlite'));
db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS records(kind TEXT,id TEXT,data TEXT NOT NULL,draft TEXT,updated TEXT DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(kind,id));
CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,hash TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user TEXT,expires INTEGER,csrf TEXT);
CREATE TABLE IF NOT EXISTS orders(id TEXT PRIMARY KEY,key TEXT UNIQUE,data TEXT NOT NULL,created TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY,actor TEXT,action TEXT,target TEXT,created TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY,value TEXT);
`);
export const get=(k,id)=>{let r=db.prepare('SELECT * FROM records WHERE kind=? AND id=?').get(k,id);return r?JSON.parse(r.data):null};
export const all=k=>db.prepare('SELECT data FROM records WHERE kind=? ORDER BY rowid').all(k).map(r=>JSON.parse(r.data));
export const put=(k,id,data)=>db.prepare(`INSERT INTO records(kind,id,data) VALUES(?,?,?) ON CONFLICT(kind,id) DO UPDATE SET data=excluded.data,updated=CURRENT_TIMESTAMP`).run(k,id,JSON.stringify({...data,id}));
if(!db.prepare("SELECT * FROM meta WHERE key='seeded'").get()){
 const read=n=>JSON.parse(fs.readFileSync(path.join(root,'data',n),'utf8'));
 for(const b of read('books.json'))put('books',b.id,b);
 const c=read('content.json');for(const [kind,rows] of Object.entries(c))for(const r of rows)put(kind,r.id,r);
 db.prepare("INSERT INTO meta VALUES('seeded','1')").run();
}
