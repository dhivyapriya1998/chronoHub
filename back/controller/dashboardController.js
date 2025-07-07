// handlers/dashboardHandler.js
const Course = require('../models/Course.model');

const getDashboardSummary = async (request, h) => {
    try {
        const courses = await Course.find({});

        const byCountry = {};
        const byCourseTitle = {};
        const validityStats = {};

        for (const courseDoc of courses) {
            for (const record of courseDoc.records || []) {
                // Country count
                if (record.country) {
                    byCountry[record.country] = (byCountry[record.country] || 0) + 1;
                }

                // Course title count
                if (record.course_title) {
                    byCourseTitle[record.course_title] = (byCourseTitle[record.course_title] || 0) + 1;
                }

                // Valid-from year stats
                if (record.valid_from) {
                    const year = new Date(record.valid_from).getFullYear();
                    validityStats[year] = (validityStats[year] || 0) + 1;
                }
            }
        }

        return h.response({
            byCountry,
            byCourseTitle,
            validityStats
        }).code(200);
    } catch (err) {
        console.error(err);
        return h.response({ message: 'Dashboard data fetch failed' }).code(500);
    }
};

module.exports = { getDashboardSummary };
