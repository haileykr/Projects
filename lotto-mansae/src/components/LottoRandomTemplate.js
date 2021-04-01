import React, { Component } from 'react';

import LottoRandomHeader from './lotto/LottoRandomHeader';
import LottoRandomSideMenu from './lotto/LottoRandomSideMenu';
import LottoRandomContent from './lotto/LottoRandomContent';

import './LottoRandomTemplate.css'

class LottoRandomTemplate extends Component {
    state = {
        selected: [],
        lottoNumbers:[]
    }

    componentDidMount() {
        const { selected } = this.state;
        for (let i = 0; i < 47; i++) {
            selected.push(false);
        }
        this.setState({ selected });
    }

    handleChange = (checked, number) => {
        console.log(number);
        const { selected } = this.state;
        selected[number - 1] = checked;
        this.setState({ selected });
    }

    handleButtonOnClick = () => {
        const {selected, lottoNumbers} = this.state;
        const numbers = [];
        let selectedNumberCount = 0;

        selected.forEach((s, i) => {
            if(s){
                selectedNumberCount++;
                numbers.push(i+1);
            }
        })

        if (selectedNumberCount < 7){
            alert("You should choose at least 7 nums")
            return;
        }else{
            const lotto=this.selectLotto([],numbers);
            lottoNumbers.push(lotto);
            this.setState({lottoNumbers})
        }
    
    }

    selectLotto = (lottoNumber,numbers)=>{
        if(lottoNumber.length === 7){
            const temp = lottoNumber.slice(0,6);
            temp.sort((a, b) => a-b);
            temp.push(lottoNumber[6]);
            return temp
        }
        let n = numbers[Math.floor(Math.random() * numbers.length)];
        if(lottoNumber.indexOf(n) < 0){
            lottoNumber.push(n);
        }
        return this.selectLotto(lottoNumber, numbers);
    }


    render() {
        return (
            <div className="lotto-random-template">
                <LottoRandomHeader />

                <div className="lotto-random-main">

                    <LottoRandomSideMenu
                        selected={this.state.selected}
                        handleChange={this.handleChange}
                        handleButtonOnClick = {this.handleButtonOnClick}
                    />

                    <LottoRandomContent
                        lottoNumbers={this.state.lottoNumbers}
                    />
                </div>
            </div>
        );
    }
}

export default LottoRandomTemplate;
