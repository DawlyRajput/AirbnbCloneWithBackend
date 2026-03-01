exports.pageNotFound = (req, res, next) => {
    res.status(404).pagetitle('404', {
        pageTitle: 'Page Not Found',
        path: null,
        isLoggedIn: res.locals.isLoggedIn,
        user: req.session.user
    });
};
