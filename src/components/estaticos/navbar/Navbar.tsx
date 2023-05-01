import React from "react";
import { AppBar, Button, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import useLocalStorage from "react-use-localstorage";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/actions";
import { toast } from "react-toastify";

function Navbar() {
    const token = useSelector<TokenState, TokenState['tokens']>(
        (state) => state.tokens
    )
    let navigate = useNavigate()
    const dispatch = useDispatch()

    function goLogout() {
        dispatch(addToken(''))
        toast.info('Usuário deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
        navigate('/login')
    }

    var navbarComponent;

    if (token != '') {
        navbarComponent = <AppBar position="static" className='bg-color'>
            <Toolbar variant="dense" className='container'>
                <Box className='itens'>
                    <Typography variant="h5" color="inherit" className='cursor'>
                        BlogPessoal
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="center">
                    <Link to='/home' className='text-decorator-none'>
                        <Box mx={1} className='itens'>
                            <Typography variant="h6" className='color-itens'>
                                Home
                            </Typography>
                        </Box>
                    </Link>

                    <Link to='/posts' className='text-decorator-none'>
                        <Box mx={1} className='itens'>
                            <Typography variant="h6" className='color-itens'>
                                Postagens
                            </Typography>
                        </Box>
                    </Link>

                    <Link to='/temas' className='text-decorator-none'>
                        <Box mx={1} className='itens'>
                            <Typography variant="h6" className='color-itens'>
                                Temas
                            </Typography>
                        </Box>
                    </Link>

                    <Link to='/formularioTema' className='text-decorator-none'>
                        <Box mx={1} className='itens'>
                            <Typography variant="h6" className='color-itens'>
                                Cadastrar Tema
                            </Typography>
                        </Box>
                    </Link>


                    <Box mx={1} className='itens' color='white' onClick={goLogout}>
                        <Typography variant="h6" className='color-itens'>
                            Logout
                        </Typography>
                    </Box>

                </Box>

            </Toolbar>
        </AppBar>
    }
    return (
        <>
    {navbarComponent}
        </>
    );
}

export default Navbar;