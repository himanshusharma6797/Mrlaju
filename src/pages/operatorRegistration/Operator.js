import React from 'react'
import { Paper } from '@material-ui/core';
import './Operator.css'
import Navbar from '../../components/Navbar';




export default function Operator() {
    return (
        <>
           <Paper sx={{ flexGrow: 1 }} className="OperatorRegNew" elevation={10} style={{ padding: '1.25rem' }}>

                <Navbar backButtonPath={'/operator-registration/new-account'} title={'Operator'} />

                <div>
                    <h3 className='operatorPageinstructionHeading'>Who is Operator?</h3>
                    <p className='operatorPageinstructionPara'>An operator is a body who represents a group
                    of residents of above 10 people.
                    </p>
                    <h3 className='operatorPageinstructionHeading'>What can an operator do on this plateform?</h3>
                    <p className='operatorPageinstructionPara'>1. Negotiate the best deals with nearby restaurents
                    or services or products for their residents
                    2. Manage inhouse runner on salery or commission
                    basis.
                    3. Promote and manage resident’s home business
                    such as nanny, food, tuition, cleaning services.
                    There
                    are many other services residents can provide.
                    4. Profit sharing with merchants for giving potential
                    sales to them.
                    </p>
                    <h3 className='operatorPageinstructionHeading'>Who can be an Operator?</h3>
                    <p className='operatorPageinstructionPara'>1. Joint Manager Body
                    2. Management Corporation
                    3. Resident Association
                    4. Property Developer
                    5. Other legal entity representing group of residents
                    </p>
                    <h3 className='operatorPageinstructionHeading'>Any financial deduction from the commission
                    earned?</h3>
                    <p className='operatorPageinstructionPara'>There is a 20% platform commission fee on the
                    commission earned.</p>
                    <h3 className='operatorPageinstructionHeading'>Money distribution timing</h3>
                    <p className='operatorPageinstructionPara'>The platform will distribute commission to
                    operators to operators and runners every Thursday.
                    If Thursday
                    is a public holiday, the platform will
                    distribute it on
                    the next working day,</p>
                    <h3 className='operatorPageinstructionHeading'>Can a runner become an operator and represent a
                    resident group?</h3>
                    <p className='operatorPageinstructionPara'>Yes. However the runner must upload these two
                    documents
                    1. A consent letter from the resident group for
                    represent them
                    2. The resident group certification issued by
                    authority.</p>
                    <h3 className='operatorPageinstructionHeading'>How can I migrate an operator account to another
                    mobile number?</h3>
                    <p className='operatorPageinstructionPara'>Click the migrate account tab, fill up the from and
                    submit it to us for processing.</p>
                </div>
            </Paper>
        </>
    )
}
