import styles from './menu.module.css' 

interface InnerComponentProps {
    menuData: number;
    handleSetMenuData: (data: number) => void;
}

const Menu: React.FC<InnerComponentProps> = ({ menuData, handleSetMenuData }) =>{
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <p>MENU</p>
                <button className={menuData == 1 ? styles.active : ''} onClick={() => handleSetMenuData(1)} disabled={menuData == 1}>YOUR LIBRARY</button>
                <button className={menuData == 2 ? styles.active : ''} onClick={() => handleSetMenuData(2)} disabled={menuData == 2}>TRACKS</button>
                <button className={menuData == 3 ? styles.active : ''} onClick={() => handleSetMenuData(3)} disabled={menuData == 3}>ALBUMS</button>
                <button className={menuData == 4 ? styles.active : ''} onClick={() => handleSetMenuData(4)} disabled={menuData == 4}>ARTISTS</button>
                <button className={menuData == 5 ? styles.active : ''} onClick={() => handleSetMenuData(5)} disabled={menuData == 5}>PLAYLISTS</button>
            </div>
        </div>
    )
};

export default Menu;