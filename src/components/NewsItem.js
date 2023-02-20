import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props
        return (
            <div className='my-3'>
                <div className="card">
                    <div className='d-flex justify-content-end position-absolute end-0'>
                        <span className=" badge rounded-pill bg-danger" >
                            {source}
                        </span>
                    </div>
                    <img src={imageUrl ? imageUrl : "https://image.cnbcfm.com/api/v1/image/107192697-1676042864321-gettyimages-1464759765-032a8400_b6940871-c804-4e63-a215-6f69c4f92f50.jpeg?v=1676423240&w=1920&h=1080"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text "><small className='text-muted'>By {author ? author : "unknown"} on {new Date(date).toTimeString()}</small></p>
                        <Link to={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem