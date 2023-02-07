import './EditProfile.css';

const EditProfile = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='edit-profile'>
            <h2>Edite seus dados</h2>
            <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
            {/* preview imagem */}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome' />
                <input type="email" placeholder='E-mail' disabled />
                <label>
                    <span>Imagem do Perfil:</span>
                    <input type="file" />
                </label>
                <label>
                    <span>Bio</span>
                    <input type="text" placeholder='Descrição do perfil' />
                </label>
                <label>
                    <span>Alterar senha?</span>
                    <input type="password" placeholder='Digite sua nova senha' />
                </label>
                <input type="password" placeholder='Confirme a senha' />
                <input type="submit" value="Atualizar" />
            </form>
        </div>
    )
}

export default EditProfile