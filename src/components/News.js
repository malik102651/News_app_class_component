import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: "nz",
        pageSize: 20,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News`
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount() {


        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=25f19fadab5540fbae3c5cd0ffd79755&page=${this.state.page}&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true })
        // let data = await fetch(url)
        // let parsedData = await data.json()

        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        // console.log(this.state.page)
        this.updateNews()
        
    }

    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(70)
        

        this.setState({
            totalResults: parsedData.totalResults,
            articles: parsedData.articles,
            loading: false
        })
        this.props.setProgress(100)
        // console.log(this.state.totalResults,this.state.articles.length)
    }

    

    handleNextClick = async () => {

        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) { } else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=25f19fadab5540fbae3c5cd0ffd79755&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        //     this.setState({ loading: true })
        //     let data = await fetch(url)
        //     let parsedData = await data.json()

        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     })
        // }

        this.setState({ page: this.state.page + 1, })
        this.updateNews()
    }
    handlePrevClick = async () => {

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=25f19fadab5540fbae3c5cd0ffd79755&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true })
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })

        //  this.setState({page: this.state.page - 1,},()=>this.updateNews())
        this.setState({ page: this.state.page - 1, })
        this.updateNews()


    }

    getMorePost = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()

        this.setState({
            totalResults: parsedData.totalResults,
            articles: this.state.articles.concat(parsedData.articles),
        })
    }

    render() {

        return (
            <div className=' my-3'>
                <h1 className='text-center' style={{ margin: '35px 0px',marginTop: "90px" }}>News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
                {this.state.loading && <Spinner />}
                {/* <div className='row'>
                    {!this.state.loading && this.state.articles?.map((item) => {
                        return <div className='col-md-4' key={item.url}>
                            <NewsItem
                                title={item.title}
                                description={item.description}
                                newsUrl={item.url}
                                imageUrl={item.urlToImage}
                                author={item.author}
                                date={item.publishedAt}
                                source={item.source.name}
                            />
                        </div>
                    })}
                </div> */}
                {/* For infinite Scroll */}
                
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.getMorePost}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                // endMessage={<h4>Nothing more to show</h4>}
                >
                    <div className='container'>
                        <div className='row'>
                            {this.state.articles?.map((item, index) => {
                                return <div className='col-md-4' key={index}>
                                    <NewsItem
                                        title={item.title}
                                        description={item.description}
                                        newsUrl={item.url}
                                        imageUrl={item.urlToImage}
                                        author={item.author}
                                        date={item.publishedAt}
                                        source={item.source.name}
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}

export default News