const { tlang, ringtone, cmd,fetchJson, sleep, botpic,ffmpeg, getBuffer, pinterest, prefix, Config } = require('../lib') 
 const { mediafire } = require("../lib/mediafire.js"); 
 const { tiktok } = require("../lib/ttdl.js"); 
 const cheerio = require('cheerio'); 
 const fbInfoVideo = require('fb-info-video'); 
 const request = require('request'); 
 const axios= require('axios'); 
 const googleTTS = require("google-tts-api"); 
 const ytdl = require('youtubedl-core') 
 const fs = require('fs-extra') 
 const apks  = require('aptoide-scraper'); 
 var videotime = 60000 // 1000 min 
 var dlsize = 1000 // 1000mb 
   //-------------------------------------------------------------------------------------------------------

   cmd({ 
     pattern: "yts", 
     desc: "Gives descriptive info of query from youtube..", 
     category: "downloader", 
     filename: __filename, 
     use: '<yt search text>', 
 }, 
 async(Void, citel, text) => { 
 Void.sendMessage(citel.chat, {  
               react: {  
                   text: "🔎",  
                   key: citel.key  
               }  
           })  
     let yts = require("secktor-pack"); 
     if (!text) return citel.reply(`Example : ${prefix}yts ${tlang().title} WhatsApp Bot`); 
     let search = await yts(text); 
     let textt = "*YouTube Search*\n\n Result From " + text + "\n\n───────────────────\n"; 
     let no = 1; 
     for (let i of search.all) { 
         textt += `🏆 No : ${no++}\n ❤Title : ${i.title}\n♫ Type : ${ 
   i.type 
 }\n🎧Views : ${i.views}\n⌛Duration : ${ 
   i.timestamp 
 }\n📡Upload At : ${i.ago}\n👤Author : ${i.author.name}\n🎵Url : ${ 
   i.url 
 }\n\n──────────────\n\n`; 
     } 
     return Void.sendMessage(citel.chat, { 
         image: { 
             url: search.all[0].thumbnail, 
         }, 
         caption: textt, 
     }, { 
         quoted: citel, 
     }); 
 } 
 ) 
 //-------------------------------------------------------------------------- 
  
 cmd({ 
             pattern: "facebook", 
             alias :  ['fb','fbdl'], 
             desc: "Downloads fb videos.", 
             category: "downloader", 
             filename: __filename, 
             use: '<add fb url.>' 
         }, 
  
         async(Void, citel, text) => { 
 Void.sendMessage(citel.chat, {  
               react: {  
                   text: "🎬",  
                   key: citel.key  
               }  
           })  
 if(!text) return citel.reply(`*_Please Give me Facebook Video Url_*`);
		  try {
        const result = await fbInfoVideo(text);
        console.log("Result:", result);
			   let buttonMessage = { 
                         video: {url:result.hd}, 
                         mimetype: 'video/mp4', 
                         fileName: result.title+`.mp4`, 
                         caption :"     *FACEBOOK DOWNLOADER* "
                     } 
                  Void.sendMessage(citel.chat, buttonMessage, { quoted: citel }); 
    } catch (error) {
        console.log("Error:", error);
    } 

  }) 
  
 //--------------------------------------------------------------------------- 
  
cmd({ 
    pattern: "tiktok", 
          alias :  ['tt','ttdl'], 
    desc: "Downloads Tiktok Videos Via Url.", 
    category: "downloader", 
    filename: __filename, 
    use: '<add tiktok url.>' 
}, 

async(Void, citel, text) => { 
if(!text) return await citel.reply(`*Uhh Please, Provide me tiktok Video Url*\n*_Ex .tiktok https://www.tiktok.com/@dakwahmuezza/video/7150544062221749531_*`); 
	let result = await tiktok(text);
    return await Void.sendMessage(citel.chat, {video : {url : result.result.hd_video } , caption: "POWERD BY BLUE-LION" } , {quoted : citel });
}) 
     //--------------------------------------------------------------------------- 
 cmd({ 
             pattern: "tts", 
             desc: "text to speech.", 
             category: "downloader", 
             filename: __filename, 
             use: '<Hii,this is Secktor>', 
         }, 
         async(Void, citel, text) => { 
             if (!text) return citel.reply('Please give me Sentence to change into audio.') 
             let texttts = text 
             const ttsurl = googleTTS.getAudioUrl(texttts, { 
                 lang: "en", 
                 slow: false, 
                 host: "https://translate.google.com", 
             }); 
             return Void.sendMessage(citel.chat, { 
                 audio: { 
                     url: ttsurl, 
                 }, 
                 mimetype: "audio/mp3", 
                 fileName: `ttsCitelVoid.m4a`, 
             }, { 
                 quoted: citel, 
             }); 
         } 
  
     ) 
 //------------------------------------------------------------------------------------
cmd({
    pattern: 'xnxxdl',
     alias :  ['xxx','sex'], 
    desc: 'xnxxdl',
    category: 'gen',
    use: '<option>',
  }, async(Void,citel,text) => {
   if (!citel.isGroup) {
    if (!text) return citel.reply(`Enter Url`)
        if (!text.includes('xnxx.com')) return citel.reply(`Enter an xnxx link`)
        const fg = require('api-dylux')
        let xn = await fg.xnxxdl(text)
        let cap =`🥶  *XNXX DL*
    
        ▢ *📌Title*: ${xn.result.title}
        ▢ *⌚Duration:* ${xn.result.duration}
        ▢ *🎞️Quality:* ${xn.result.quality}`

             await citel.reply(cap) 
	    return Void.sendMessage(citel.chat, { 
                     document: { 
                         url: xn.result.files.high, 
                     }, 
                     fileName: xn.result.title+'.mp4', 
                     mimetype: 'video/mp4', 
                 }, { 
                     quoted: citel, 
                 }) 
   }
 else{
    return citel.reply('Thiis comand can not use in group.') 
 }
  });

//------------------------------------------------------------------------------------
 cmd({
    pattern: 'xnxxsearch',
     alias :  ['xxxs ','sexs','xxxsearch'], 
    desc: 'xnxxsearch',
    category: 'gen',
    use: '<option>',
  }, async(Void,citel,text) => {
   if (!citel.isGroup) {
    if (!text) return citel.reply(`Enter Url`)
    const fg = require('api-dylux')
	let res = await fg.xnxxSearch(text)
            let ff = res.result.map((v, i) => `${i + 1}┃ *Title* : ${v.title}\n*Link:* ${v.link}\n`).join('\n') 
              if (res.status) citel.reply(ff)
   }
 else{
    return citel.reply('Thiis comand can not use in group.') 
 }
  });
//-------------------------------------------------------------------------------------
       

cmd({ 
   pattern: 'apk', 
   desc: 'Download APK', 
   category: 'downloader', 
   use:'<does this>', 
 }, async(Void,citel,text) => { 
 const args = text; 
 let search1 = await apks.search(args); 
 const id1 = search1[0].id ; 
 const apkname = search1[0].name ; 
 let apkdata = await apks.download(id1); 
 const dla = apkdata.dllink; 
 const icona = apkdata.icon; 
 const lastup = apkdata.lastup; 
 const size = apkdata.size;

 var rep = `* 📱APK Downloader📱*

*🔍 Name :* ${apkname}

*📀 Package Name :* ${id1}

*📲 Update On :* ${lastup}

*📊 Size :* ${size}` ;

await Void.sendMessage(citel.chat,{image:{url:icona,}, caption: rep,});
 return Void.sendMessage(citel.chat,{ 
     document: { 
         url: dla, 
     }, 
     fileName: apkname+'.apk', 
     mimetype: "application/vnd.android.package-archive", 
 }, { 
     quoted: citel, 
 }) 
});

 //---------------------------------------------------------------------------  

 cmd({ 
    pattern: 'gdrive', 
    desc: 'Download File from Google Drive', 
    category: 'downloader', 
    use:'<does this>', 
  }, async(Void,citel,text) => { 
    if (!text) return citel.reply('Please Enter the Google Drive link.') 
    const dg = require('api-dylux')
    let res = await dg.GDriveDl(text)
  await citel.reply(`
  🧧 Google Drive Downloder*

  💠 *Nama:* ${res.fileName}
  💠 *Size:* ${res.fileSize}
  💠 *Type:* ${res.mimetype}`)

  return Void.sendMessage(citel.chat,{ 
      document: { 
          url: res.downloadUrl, 
      }, 
      fileName: res.fileName, 
      mimetype: res.mimetype, 
  }, { 
      quoted: citel, 
  }) 
 });
    //--------------------------------------------------------------------------- 
 cmd({ 
             pattern: "video", 
             desc: "Downloads video from yt.", 
             category: "downloader", 
             filename: __filename, 
             use: '<faded-Alan Walker>', 
         }, 
         async(Void, citel, text) => { 
 Void.sendMessage(citel.chat, {  
               react: {  
                   text: "📽️",  
                   key: citel.key  
               }  
           })  
           try { 

            let urlYt = text; 

            if (!urlYt.startsWith("http")) {
                let yts = require("secktor-pack"); 
                 let search = await yts(text); 
                 let anu = search.videos[0]; 
                 let urlYt = anu.url 
                 const getRandom = (ext) => { 
                     return `${Math.floor(Math.random() * 10000)}${ext}`; 
                 }; 
                     let infoYt = await ytdl.getInfo(urlYt); 
                     if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`❌ Video file too big!`); 
                     let titleYt = infoYt.videoDetails.title; 
                     let randomName = getRandom(".mp4"); 
                     citel.reply('📥 Downloadig Your Video.') 
                     const stream = ytdl(urlYt, { 
                             filter: (info) => info.itag == 22 || info.itag == 18, 
                         }) 
                         .pipe(fs.createWriteStream(`./${randomName}`)); 
                     await new Promise((resolve, reject) => { 
                         stream.on("error", reject); 
                         stream.on("finish", resolve); 
                     }); 
                     let stats = fs.statSync(`./${randomName}`); 
                     let fileSizeInBytes = stats.size; 
                     let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024); 
                     if (fileSizeInMegabytes <= dlsize) { 
      
                             let buttonMessage = {  
                              video: fs.readFileSync(`./${randomName}`),  
                              mimetype: 'video/mp4',  
                              fileName: `${titleYt}.mp4`, 
                              caption: ` 📌 Title : ${titleYt}\n 📥 File Size : ${fileSizeInMegabytes} MB`, 
      
                          }  
                       Void.sendMessage(citel.chat, buttonMessage, { quoted: citel }); 
      
                      return fs.unlinkSync(`./${randomName}`); 
                     } else { 
                         citel.reply(`❌ File size bigger than 100mb.`); 
                     } 
                     return fs.unlinkSync(`./${randomName}`);  
                    
            }
               
    else {
        const getRandom = (ext) => { 
            return `${Math.floor(Math.random() * 10000)}${ext}`; 
        }; 
        let infoYt = await ytdl.getInfo(urlYt); 
        if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`❌ Video file too big!`); 
        let titleYt = infoYt.videoDetails.title; 
        let randomName = getRandom(".mp4"); 

        const stream = ytdl(urlYt, { 
                filter: (info) => info.itag == 22 || info.itag == 18, 
            }) 
            .pipe(fs.createWriteStream(`./${randomName}`)); 
        await new Promise((resolve, reject) => { 
            stream.on("error", reject); 
            stream.on("finish", resolve); 
        }); 
        let stats = fs.statSync(`./${randomName}`); 
        let fileSizeInBytes = stats.size; 
        let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024); 
        if (fileSizeInMegabytes <= dlsize) { 
            let yts = require("secktor-pack"); 
            let search = await yts(text); 
            let buttonMessage = {  
                video: fs.readFileSync(`./${randomName}`),  
                mimetype: 'video/mp4',  
                fileName: `${titleYt}.mp4`, 
                caption: ` 📌 Title : ${titleYt}\n 📥 File Size : ${fileSizeInMegabytes} MB`, 

            }  
         Void.sendMessage(citel.chat, buttonMessage, { quoted: citel }) 
         return fs.unlinkSync(`./${randomName}`); 
        } else { 
            citel.reply(`❌ File size bigger than 100mb.`); 
        } 
        return fs.unlinkSync(`./${randomName}`);      
             
                      }           
                    } 
             catch (e) { 

            console.log(e) 
        } 
           
  }) 
  
     //--------------------------------------------------------------------------- 
 cmd({ 
             pattern: "play", 
             desc: "Sends info about the query(of youtube video/audio).", 
             category: "downloader", 
             filename: __filename, 
             use: '<faded-Alan walker.>', 
         }, 
         async(Void, citel, text) => { 
             if (!text) return citel.reply(`Use ${command} Back in Black`); 
             let yts = require("secktor-pack"); 
             let search = await yts(text); 
             let anu = search.videos[0]; 
             let buttonMessage = { 
                 image: { 
                     url: anu.thumbnail, 
                 }, 
                 caption: ` 
 ╭───────────────◆ 
 │⿻ ${tlang().title}  
 │  *Youtube Player* ✨ 
 │⿻ *Title:* ${anu.title} 
 │⿻ *Duration:* ${anu.timestamp} 
 │⿻ *Viewers:* ${anu.views} 
 │⿻ *Uploaded:* ${anu.ago} 
 │⿻ *Author:* ${anu.author.name} 
 ╰────────────────◆ 
 ⦿ *Url* : ${anu.url} 
 `, 
                 footer: tlang().footer, 
                 headerType: 4, 
             }; 
             return Void.sendMessage(citel.chat, buttonMessage, { 
                 quoted: citel, 
             }); 
  
         } 
     ) 
     //--------------------------------------------------------------------------- 
 cmd({ 
             pattern: "ringtone", 
             desc: "Downloads ringtone.", 
             category: "downloader", 
             filename: __filename, 
             use: '<ringtone name>', 
         }, 
         async(Void, citel, text) => { 
             if (!text) return citel.reply(`Example: ${prefix}ringtone back in black`) 
             let anu = await ringtone(text) 
             let result = anu[Math.floor(Math.random() * anu.length)] 
             return Void.sendMessage(citel.chat, { audio: { url: result.audio }, fileName: result.title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: citel }) 
         } 
     ) 
     //--------------------------------------------------------------------------- 
 cmd({ 
             pattern: "pint", 
             desc: "Downloads image from pinterest.", 
             category: "downloader", 
             filename: __filename, 
             use: '<text|image name>', 
         }, 
         async(Void, citel, text) => { 
             if (!text) return reply("What picture are you looking for?") && Void.sendMessage(citel.chat, { 
                 react: { 
                     text: '❌', 
                     key: citel.key 
                 } 
             }) 
             try { 
                 anu = await pinterest(text) 
                 result = anu[Math.floor(Math.random() * anu.length)] 
                 let buttonMessage = { 
                     image: { 
                         url: result 
                     }, 
                     caption: ` `, 
                     footer: tlang().footer, 
                     headerType: 4, 
                     contextInfo: { 
                         externalAdReply: { 
                             title: `Here it is✨`, 
                             body: `${Config.ownername}`, 
                             thumbnail: log0, 
                             mediaType: 2, 
                             mediaUrl: ``, 
                             sourceUrl: `` 
                         } 
                     } 
                 } 
                 return Void.sendMessage(citel.chat, buttonMessage, { 
                     quoted: citel 
                 }) 
             } catch (e) { 
                 console.log(e) 
             } 
         }) 
     //--------------------------------------------------------------------------- 
     cmd({ 
             pattern: "mediafire", 
             desc: "Downloads apps.", 
             category: "downloader", 
             filename: __filename, 
             use: '<url of mediafire>', 
         }, 
         async(Void, citel, text) => { 
             if (!text) return citel.reply(`Give app name`); 
             const baby1 = await mediafire(text); 
             if (baby1[0].size.split("MB")[0] >= 999) return reply("*File Over Limit* " + util.format(baby1)); 
             const result4 = `*Mᴇᴅɪᴀғɪʀᴇ Dᴏᴡɴʟᴏᴀᴅᴇʀ* 
 *Nᴀᴍᴇ* : ${baby1[0].nama} 
 *Sɪᴢᴇ* : ${baby1[0].size} 
 *Mɪᴍᴇ* : ${baby1[0].mime} 
 *Lɪɴᴋ* : ${baby1[0].link}`; 
             reply(`${result4}`); 
             return Void.sendMessage(citel.chat, { 
                     document: { 
                         url: baby1[0].link, 
                     }, 
                     fileName: baby1[0].nama, 
                     mimetype: baby1[0].mime, 
                 }, { 
                     quoted: citel, 
                 }) 
                 .catch((err) => reply("could not found anything")); 
  
         } 
     ) 
  
     //--------------------------------------------------------------------------- 
 cmd({ 
             pattern: "song", 
             alias :['audio'], 
             desc: "Downloads audio from youtube.", 
             category: "downloader", 
             filename: __filename, 
             use: '<text>', 
         }, 
         async(Void, citel, text) => { 
 Void.sendMessage(citel.chat, {  
               react: {  
                   text: "🎧",  
                   key: citel.key  
               }  
           })  
           try { 
            let urlYt = text; 
            if (!urlYt.startsWith("http")) { 
                let yts = require("secktor-pack"); 
                let search = await yts(text); 
                let anu = search.videos[0]; 
                const getRandom = (ext) => { 
                    return `${Math.floor(Math.random() * 10000)}${ext}`; 
                }; 
                let infoYt = await ytdl.getInfo(anu.url); 
                if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`❌ Video file too big!`); 
                let titleYt = infoYt.videoDetails.title; 
                let randomName = getRandom(".mp3"); 
                citel.reply('📥 Downloadig Your Song.') 
                const stream = ytdl(anu.url, { 
                        filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128, 
                    }) 
                    .pipe(fs.createWriteStream(`./${randomName}`)); 
                await new Promise((resolve, reject) => { 
                    stream.on("error", reject); 
                    stream.on("finish", resolve); 
                }); 
     
                let stats = fs.statSync(`./${randomName}`); 
                let fileSizeInBytes = stats.size; 
                let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024); 
                if (fileSizeInMegabytes <= dlsize) { 
                    let buttonMessage = { 
                        audio: fs.readFileSync(`./${randomName}`), 
                        mimetype: 'audio/mpeg', 
                        fileName: titleYt + ".mp3", 
                        headerType: 4, 
                        contextInfo: { 
                            externalAdReply: { 
                                title: titleYt, 
                                body: citel.pushName, 
                                renderLargerThumbnail: true, 
                                thumbnailUrl: search.all[0].thumbnail, 
                                mediaUrl: text, 
                                mediaType: 1, 
                                thumbnail: await getBuffer(search.all[0].thumbnail), 
                                sourceUrl: text, 
                            }, 
                        }, 
                    } 
    Void.sendMessage(citel.chat, buttonMessage, { quoted: citel }) 
                    return fs.unlinkSync(`./${randomName}`); 
                } else { 
                    citel.reply(`❌ File size bigger than 100mb.`); 
                } 
                fs.unlinkSync(`./${randomName}`); 
     
            } 
            else{
            let infoYt = await ytdl.getInfo(urlYt); 
            const getRandom = (ext) => { 
                return `${Math.floor(Math.random() * 10000)}${ext}`; 
            }; 
            //30 MIN 
            if (infoYt.videoDetails.lengthSeconds >= videotime) { 
                reply(`❌ I can't download that long video!`); 
                return; 
            } 
            let titleYt = infoYt.videoDetails.title; 
            let randomName = getRandom(".mp3"); 
            const stream = ytdl(urlYt, { 
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128, 
                }) 
                .pipe(fs.createWriteStream(`./${randomName}`)); 
            await new Promise((resolve, reject) => { 
                stream.on("error", reject); 
                stream.on("finish", resolve); 
            }); 
 
            let stats = fs.statSync(`./${randomName}`); 
            let fileSizeInBytes = stats.size; 
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024); 
            if (fileSizeInMegabytes <= dlsize) { 
                let yts = require("secktor-pack"); 
                let search = await yts(text); 
                let buttonMessage = { 
                    audio: fs.readFileSync(`./${randomName}`), 
                    mimetype: 'audio/mpeg', 
                    fileName: titleYt + ".mp3", 
                    headerType: 4, 
                    contextInfo: { 
                        externalAdReply: { 
                            title: titleYt, 
                            body: citel.pushName, 
                            renderLargerThumbnail: true, 
                            thumbnailUrl: search.all[0].thumbnail, 
                            mediaUrl: text, 
                            mediaType: 1, 
                            thumbnail: await getBuffer(search.all[0].thumbnail), 
                            sourceUrl: text, 
                        }, 
                    }, 
                } 
                await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel }) 
                return fs.unlinkSync(`./${randomName}`); 
            } else { 
                citel.reply(`❌ File size bigger than 100mb.`); 
            } 
            fs.unlinkSync(`./${randomName}`); 
        }
        } catch (e) { 
            console.log(e) 
        } 
  
  
         } 
     ) 
     //--------------------------------------------------------------------------- 
 cmd({ 
     pattern: "songdoc", 
     alias :['audiodoc','song2'], 
     desc: "Downloads audio from youtube.", 
     category: "downloader", 
     filename: __filename, 
     use: '<text>', 
 }, 
 async(Void, citel, text) => { 
     let yts = require("secktor-pack"); 
     let search = await yts(text); 
     let anu = search.videos[0]; 
     const getRandom = (ext) => { 
         return `${Math.floor(Math.random() * 10000)}${ext}`; 
     }; 
     let infoYt = await ytdl.getInfo(anu.url); 
     if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`❌ Video file too big!`); 
     let titleYt = infoYt.videoDetails.title; 
     let randomName = getRandom(".mp3"); 
     citel.reply('📥 Downloadig Your Song.') 
     const stream = ytdl(anu.url, { 
             filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128, 
         }) 
         .pipe(fs.createWriteStream(`./${randomName}`)); 
     await new Promise((resolve, reject) => { 
         stream.on("error", reject); 
         stream.on("finish", resolve); 
     }); 
  
     let stats = fs.statSync(`./${randomName}`); 
     let fileSizeInBytes = stats.size; 
     let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024); 
     if (fileSizeInMegabytes <= dlsize) { 
  
 let buttonMessag1e = { 
             document: fs.readFileSync(`./${randomName}`), 
             mimetype: 'audio/mpeg', 
             fileName: titleYt + ".mp3", 
             headerType: 4, 
             contextInfo: { 
                 externalAdReply: { 
                     title: titleYt, 
                     body: citel.pushName, 
                     renderLargerThumbnail: true, 
                     thumbnailUrl: search.all[0].thumbnail, 
                     mediaUrl: text, 
                     mediaType: 1, 
                     thumbnail: await getBuffer(search.all[0].thumbnail), 
                     sourceUrl: text, 
                 }, 
             }, 
         } 
 Void.sendMessage(citel.chat, buttonMessag1e, { quoted: citel }) 
         return fs.unlinkSync(`./${randomName}`); 
     } else { 
         citel.reply(`❌ File size bigger than 100mb.`); 
     } 
     fs.unlinkSync(`./${randomName}`); 
  
 } 
 ) 
     //--------------------------------------------------------------------------- 
  
 cmd({ 
             pattern: "ytmp4", 
             desc: "Downloads video from youtube.", 
             category: "downloader", 
             filename: __filename, 
             use: '<yt video url>', 
         }, 
         async(Void, citel, text) => { 
             const getRandom = (ext) => { 
                 return `${Math.floor(Math.random() * 10000)}${ext}`; 
             }; 
             if (!text) { 
                 citel.reply(`❌Please provide me a url`); 
                 return; 
             } 
             try { 
                 let urlYt = text; 
                 if (!urlYt.startsWith("http")) return citel.reply(`❌ Give youtube link!`); 
                 let infoYt = await ytdl.getInfo(urlYt); 
                 if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`❌ Video file too big!`); 
                 let titleYt = infoYt.videoDetails.title; 
                 let randomName = getRandom(".mp4"); 
  
                 const stream = ytdl(urlYt, { 
                         filter: (info) => info.itag == 22 || info.itag == 18, 
                     }) 
                     .pipe(fs.createWriteStream(`./${randomName}`)); 
                 await new Promise((resolve, reject) => { 
                     stream.on("error", reject); 
                     stream.on("finish", resolve); 
                 }); 
                 let stats = fs.statSync(`./${randomName}`); 
                 let fileSizeInBytes = stats.size; 
                 let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024); 
                 if (fileSizeInMegabytes <= dlsize) { 
                     let yts = require("secktor-pack"); 
                     let search = await yts(text); 
                     let buttonMessage = {  
                         video: fs.readFileSync(`./${randomName}`),  
                         mimetype: 'video/mp4',  
                         fileName: `${titleYt}.mp4`, 
                         caption: ` 📌 Title : ${titleYt}\n 📥 File Size : ${fileSizeInMegabytes} MB`, 
  
                     }  
                  Void.sendMessage(citel.chat, buttonMessage, { quoted: citel }) 
                  return fs.unlinkSync(`./${randomName}`); 
                 } else { 
                     citel.reply(`❌ File size bigger than 100mb.`); 
                 } 
                 return fs.unlinkSync(`./${randomName}`);       
             } catch (e) { 
                 console.log(e) 
             } 
         } 
     ) 
     //--------------------------------------------------------------------------- 
 cmd({ 
         pattern: "ytmp3", 
         desc: "Downloads audio by yt link.", 
         category: "downloader", 
         use: '<yt video url>', 
     }, 
     async(Void, citel, text) => { 
         const getRandom = (ext) => { 
             return `${Math.floor(Math.random() * 10000)}${ext}`; 
         }; 
  
         if (text.length === 0) { 
             reply(`❌ URL is empty! \nSend ${prefix}ytmp3 url`); 
             return; 
         } 
         try { 
             let urlYt = text; 
             if (!urlYt.startsWith("http")) { 
                 citel.reply(`❌ Give youtube link!`); 
                 return; 
             } 
             let infoYt = await ytdl.getInfo(urlYt); 
             //30 MIN 
             if (infoYt.videoDetails.lengthSeconds >= videotime) { 
                 reply(`❌ I can't download that long video!`); 
                 return; 
             } 
             let titleYt = infoYt.videoDetails.title; 
             let randomName = getRandom(".mp3"); 
             const stream = ytdl(urlYt, { 
                     filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128, 
                 }) 
                 .pipe(fs.createWriteStream(`./${randomName}`)); 
             await new Promise((resolve, reject) => { 
                 stream.on("error", reject); 
                 stream.on("finish", resolve); 
             }); 
  
             let stats = fs.statSync(`./${randomName}`); 
             let fileSizeInBytes = stats.size; 
             let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024); 
             if (fileSizeInMegabytes <= dlsize) { 
                 let yts = require("secktor-pack"); 
                 let search = await yts(text); 
                 let buttonMessage = { 
                     audio: fs.readFileSync(`./${randomName}`), 
                     mimetype: 'audio/mpeg', 
                     fileName: titleYt + ".mp3", 
                     headerType: 4, 
                     contextInfo: { 
                         externalAdReply: { 
                             title: titleYt, 
                             body: citel.pushName, 
                             renderLargerThumbnail: true, 
                             thumbnailUrl: search.all[0].thumbnail, 
                             mediaUrl: text, 
                             mediaType: 1, 
                             thumbnail: await getBuffer(search.all[0].thumbnail), 
                             sourceUrl: text, 
                         }, 
                     }, 
                 } 
                 await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel }) 
                 return fs.unlinkSync(`./${randomName}`); 
             } else { 
                 citel.reply(`❌ File size bigger than 100mb.`); 
             } 
             fs.unlinkSync(`./${randomName}`); 
         } catch (e) { 
             console.log(e) 
         } 
  
     } 
 ) 
  
   //--------------------------------------------------------------------------- 
 cmd({ 
         pattern: "ytdoc", 
         desc: "Downloads audio by yt link as document.", 
         category: "downloader", 
         use: '<ytdoc video url>', 
     }, 
     async(Void, citel, text) => { 
         const getRandom = (ext) => { 
             return `${Math.floor(Math.random() * 10000)}${ext}`; 
         }; 
  
         if (text.length === 0) { 
             reply(`❌ URL is empty! \nSend ${prefix}ytmp3 url`); 
             return; 
         } 
         try { 
             let urlYt = text; 
             if (!urlYt.startsWith("http")) { 
                 citel.reply(`❌ Give youtube link!`); 
                 return; 
             } 
             let infoYt = await ytdl.getInfo(urlYt); 
             //30 MIN 
             if (infoYt.videoDetails.lengthSeconds >= videotime) { 
                 reply(`❌ I can't download that long video!`); 
                 return; 
             } 
             let titleYt = infoYt.videoDetails.title; 
             let randomName = getRandom(".mp3"); 
             const stream = ytdl(urlYt, { 
                     filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128, 
                 }) 
                 .pipe(fs.createWriteStream(`./${randomName}`)); 
             await new Promise((resolve, reject) => { 
                 stream.on("error", reject); 
                 stream.on("finish", resolve); 
             }); 
  
             let stats = fs.statSync(`./${randomName}`); 
             let fileSizeInBytes = stats.size; 
             let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024); 
             if (fileSizeInMegabytes <= dlsize) { 
                 let yts = require("secktor-pack"); 
                 let search = await yts(text); 
                 let buttonMessage = { 
                     document: fs.readFileSync(`./${randomName}`), 
                     mimetype: 'audio/mpeg', 
                     fileName: titleYt + ".mp3", 
                     headerType: 4, 
                     contextInfo: { 
                         externalAdReply: { 
                             title: titleYt, 
                             body: citel.pushName, 
                             renderLargerThumbnail: true, 
                             thumbnailUrl: search.all[0].thumbnail, 
                             mediaUrl: text, 
                             mediaType: 1, 
                             thumbnail: await getBuffer(search.all[0].thumbnail), 
                             sourceUrl: text, 
                         }, 
                     }, 
                 } 
                 await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel }) 
                 return fs.unlinkSync(`./${randomName}`); 
             } else { 
                 citel.reply(`❌ File size bigger than 100mb.`); 
             } 
             fs.unlinkSync(`./${randomName}`); 
         } catch (e) { 
             console.log(e) 
         } 
  
     } 
 )
