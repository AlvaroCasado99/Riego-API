function notFound (req, res, next) {
    res.status(404).json({
        error: "Not Found"
    })
}

export default notFound