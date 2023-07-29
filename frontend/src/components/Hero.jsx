import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
    return (
        <div className=' py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                    <h1 className='text-center mb-4'>Argos Academy</h1>
                    <p className='text-center mb-4'>
                        At Argos Academy, we seek to empower educators and parents with hardware, software, and lesson plans that are designed to make teaching STEM and workforce development accessible and engaging. From cost-effective hardware/software packages to accessible simulators that develop skills in a safe environment, we provide the content, tools, and support that allow for STEM to be in the hands of every child.

Join us in shaping a brighter future for students!
                    </p>
                    <div className='d-flex'>
                        <LinkContainer to='/login'>
                            <Button variant='primary' className='me-3'>
                                Sign In
                            </Button>
                        </LinkContainer>
                        <LinkContainer to='/register'>
                            <Button variant='secondary'>
                                Sign Up
                            </Button>
                        </LinkContainer>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Hero;