const Note = require("../models/noteModels")

exports.postNote = (req,res,next)=>{
    const title = req.body.title
    const user = req.body.user
    const text = req.body.text

    const note = new Note({
        title:title,
        user:user,
        text:text
    })
    note.save().then(note=>{
        res.status(200).json({
            note:note
        })
    }).catch(err=>{
        const error = new Error("Posting note failed 15 line in noteContolres file ")
        throw error
    })
}