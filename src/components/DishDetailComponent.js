import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row, Col, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class DishDetail extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render(){
        const RenderDish = ({dish}) => {
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
    
        const CommentForm = () => {
            return(
                <div>
                    <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Submit Comment</Button>
                    <div>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Row className="form-group">
                                        <Col>
                                            <Control.select model=".rating" name="rating" 
                                            className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                    <Label htmlFor="yname">First Name</Label>
                                    <Row className="form-group">
                                        <Col>
                                            <Control.text model=".yname" id="yname" name="yname"
                                                placeholder="Your Name" className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                }}
                                            />
                                            <Errors
                                                className="text-danger" model=".yname" show="touched"
                                                messages={{
                                                    required: '-Required ',
                                                    minLength: '-Must be 2 characters or more ',
                                                    maxLength: '-Must be 15 characters or less '
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Label htmlFor="message">Your Feedback</Label>
                                    <Row className="form-group">
                                        <Col>
                                            <Control.textarea model=".message" id="message" name="message"
                                                rows="6" className="form-control"/>
                                        </Col>
                                    </Row>
                                    <Row className="form-group ml-auto">
                                        <Button type="submit" value="submit" color="primary">
                                            Send Feedback
                                        </Button>
                                    </Row>
                                </LocalForm>
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            );
        }
    
        const RenderComments = ({comments}) =>{
            if (comments != null) {
                const review = comments.map((com) => {
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
                        <CommentForm/>
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

        if(this.props.dish != null)
            return(
                <div>
                    <div class="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{this.props.dish.name}</h3>
                                <hr/>
                            </div>
                        </div>
                        <div className="row ml-auto">
                            <h3>Menu</h3>
                            <hr/>
                        </div>
                        <div className="row">
                            <RenderDish dish = {this.props.dish}/>
                            <RenderComments comments = {this.props.comments}/>
                        </div>
                    </div>
                </div>
            );   
        else
            return(
                <div></div>
            );
    }
}

export default DishDetail;