function notFound (req, res, next) {
    response.status(404).json({
        error: "Not Found"
    })
}

export default notFound