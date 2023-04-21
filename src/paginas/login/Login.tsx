import React, { useState, ChangeEvent, useEffect } from "react";
import {Button, Grid, TextField, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import './Login.css';
import UserLogin from "../../models/UserLogin";
import { api } from "../../services/Service";

function Login(){
    let history = useNavigate();
    const [token, setToken] = useLocalStorage('token');
    const [userLogin, setUserLogin] = useState<UserLogin>(
    {
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    }
    )

    function updateModel(e: ChangeEvent<HTMLInputElement>) {

        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value 
        })
    }   

        useEffect(()=>{
            if (token != ''){
                history.push('/home')
            }
        }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try{
            const resposta = await api.post(`/usuarios/logar`, userLogin)
            setToken (resposta.data.token)

            alert ('Usuário logado com sucesso');
        }catch(error){
            alert ('Dados do usuário inconsistentes. Erro ao logar');
        }
    }

    return(
    <Grid container direction='row' justifyContent='center' alignItems='center'>

    <Grid alignItems='center' xs={6} >
        <Box paddingX={20}>
            <form onSubmit={onSubmit}>
                <Typography variant='h3' gutterBottom color='textPrimary' align='center' className='negrito'>Entrar</Typography>
                <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>)=> updateModel(e)} id='usuario' label='Nome do Usuario' variant='outlined' name='usuario' margin='normal' fullWidth></TextField>
                <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>)=> updateModel(e)} id='senha' label='Digite sua Senha' variant='outlined' name='senha' margin='normal' fullWidth type='password'></TextField>

                <Box marginTop={2} textAlign='center'>
                    <Link to='/home' className='text-decoration-none'>
                        <Button type='submit' variant='contained' color='primary'>
                            Logar
                        </Button>
                    </Link>
                </Box>
            </form>

            <Box display='flex' justifyContent='center' marginTop={2}>
                <Box marginRight={1}>
                    <Typography variant='subtitle1' gutterBottom align='center'>Não possui uma conta?</Typography>
                </Box>

                <Link to='/cadastroUsuario' style={{color: 'black'}}>
                <Typography variant='subtitle1'gutterBottom align='center' className='negrito'>Cadastre-se</Typography>
                </Link>
            </Box>
        </Box>
    </Grid>

    <Grid xs={6} className='imagem'>
        
    </Grid>
</Grid>
    );
}

export default Login;