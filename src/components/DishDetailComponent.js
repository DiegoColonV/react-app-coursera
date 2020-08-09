import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

    function RenderDish({dish}){
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

    function RenderComments({dish})
    {
        if(dish != null){
            if (dish.comments != null) {
                const review = dish.comments.map((com) => {
                    return(
                        <div key={com.id}>
                            <ul className="list-unstyled">
                                <li>{com.comment} Rating: {com.rating}</li>
                                <li>--{com.author}, {new Intl.DateTimeFormat('en-GB', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(com.date)))}</li>
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

    const DishDetail = (props) =>{
        return(
            <div class="container">
                <div className="row">
                    <RenderDish dish = {props.selectedDish}/>
                    <RenderComments dish = {props.selectedDish}/>
                </div>
            </div>
        );       
    }

export default DishDetail;