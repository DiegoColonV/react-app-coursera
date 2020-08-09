import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);

        this.state={
        }
    }

    renderDish(dish){
        if(dish != null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else
        {
            return(
                <div></div>
            );
        }
    }

    renderComments(dish)
    {
        if(dish != null){
            if (dish.comments != null) {
                const review = dish.comments.map((com) => {
                    return(
                        <div key={com.id}>
                            <ul className="list-unstyled">
                                <li>{com.comment} Rating: {com.rating}</li>
                                <li>--{com.author}, {com.date}</li>
                            </ul>
                        </div>
                    );
                });
    
                return(
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        {review}
                    </div>
                );
            }
            else
            {
                return(
                    <div></div>
                );
            }
            
        }
        else
        {
            return(
                <div></div>
            );
        }

    }

    render(){
        return(
            <div className="row">
                {this.renderDish(this.props.selectedDish)}
                {this.renderComments(this.props.selectedDish)}
            </div>
        );       
    }
}

export default DishDetail;