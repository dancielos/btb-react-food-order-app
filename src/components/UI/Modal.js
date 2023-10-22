import classes from './Modal.module.css';
import { createPortal } from 'react-dom';

const Backdrop = (props) => (
	<div className={classes.backdrop} onClick={props.onHideModal}></div>
);

const ModalOverlay = function (props) {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const portalTo = document.getElementById('overlays');

const Modal = function (props) {
	return (
		<>
			{createPortal(<Backdrop onHideModal={props.onHideModal} />, portalTo)}
			{createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalTo)}
		</>
	);
};

export default Modal;
