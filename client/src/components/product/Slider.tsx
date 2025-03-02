import Container from "@comp/container/Container"
import Label from "@comp/form/Label"
import styles from '@styles/global.module.scss'
import ss from '@styles/variables/slider.module.scss'
import Picture from "@comp/container/Picture"
import { Link } from "react-router-dom"
import rightArrow from '@icons/black-right-arrow-icon.png'
import React from "react"

type sliderProps = {
    children:React.ReactNode
    label?:string
    gap?:string
}
const Slider = ({children, label, gap=`${styles.g4}`}:sliderProps) =>{
    return(
        <>
            <Container width="100%" px="0px" py="0px" center className="space-between ">
                <Label className="ls-5xl lh-5xl"  fontSize={styles.f5xl}>{label}</Label>
                <Container px='0px' py='0px' className="" >
                    <Link to='/register' className='no-padding link-with-icon right'>
                        <Label  color={styles.black}>View More</Label>
                        <Picture width='25px' height="20px" src={rightArrow} className=""/>
                    </Link>
                </Container>
            </Container>
            
            
            <Container className={`${ss.slider} no-br`} width="100vw" py={styles.g4} gap={gap}>
                {children}
            </Container>
        </>
    )
}

export default Slider