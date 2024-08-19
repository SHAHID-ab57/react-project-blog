export const calculateBlogsReview = (blogs,reviews)=>{
let ratingsMap={}

reviews.forEach(element => {
    if (!ratingsMap[element.blogid]){
        ratingsMap[element.blogid]=[]
    }
     ratingsMap[element.blogid].push(Number(element.review))

});

return blogs.map(blog=>{
    let ratings = ratingsMap[blog.id] || [0];
    let total = ratings.reduce((prev , curr)=> prev+curr , 0)
    let averageRating = ratings.length? total/ratings.length:0
    return {...blog,averageRating}
})
}