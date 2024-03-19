const axios = require('axios');
const News = require('../../models/News');


const getLatestNews = async (req, res) => {
    try {

        const lastInsertedNews = await News.findOne({}, {}, { sort: { 'createdAt': -1 } });

        const currentTime = new Date();
        const lastInsertedTime = lastInsertedNews.createdAt;
        const elapsedTime = (currentTime - lastInsertedTime) / (1000 * 60 * 60);
        let latestNews = [];
        if (elapsedTime > 2) {
            const response = await axios.get("https://gnews.io/api/v4/top-headlines?category=general&apikey=cdb27dc2841ff9fba6c9b4b19e5c5102");

            for (var i = 0; i < response.data.articles.length; i++) {
                const news = new News({
                    title: response.data.articles[i].title,
                    description: response.data.articles[i].description,
                    content: response.data.articles[i].content,
                    url: response.data.articles[i].url,
                    image: response.data.articles[i].image,
                    publishedAt: response.data.articles[i].publishedAt,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                await news.save();
            }
            latestNews = await News.find({}).sort({ createdAt: -1 }).limit(5);

        } else {
            latestNews = await News.find({}).sort({ createdAt: -1 }).limit(5);

        }
        return res.status(200).json({
            message: 'News Saved successfully',
            status: 200,
            data: latestNews
        });
    } catch (error) {
        console.error('Error fetching latest news:', error);
        throw error;
    }
}

module.exports = { getLatestNews }