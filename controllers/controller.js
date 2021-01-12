exports.upload =  (req, res) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully!', 'file': req.file
        });
    } catch (error) {
        console.error(error);
    }
};
