import tw from "twin.macro";
import useNamiWallet from "../hooks/useNamiWallet";
import Button from "./Button";

const WalletObjectKeys = tw.span`w-full whitespace-pre-wrap word-wrap[break-word] mb-2`;
const WalletObjectWrapper = tw.div`flex flex-col justify-evenly m-3 p-3 bg-gray-300 text-gray-800`;

const ConnectNamiWallet = () => {
	const {
		enabled,
		error,
		wallet,
		loading,
		handleEnable
	} = useNamiWallet();
	const label = loading
		? "...Attempting to Connect"
		: "Connect Nami Wallet";
	return (
		<div>
			{wallet ? (
				<WalletObjectWrapper>
					<WalletObjectKeys>
						<strong>Address: </strong>
						{wallet.address}
					</WalletObjectKeys>
					<WalletObjectKeys>
						<strong>Balance: </strong>
						{wallet.balance}
					</WalletObjectKeys>
				</WalletObjectWrapper>
			) : null}
			<Button
				onClick={handleEnable}
				disabled={enabled || loading}
				label={label}
				error={error}
				width={"full"}
			/>
		</div>
	);
};

export default ConnectNamiWallet;
