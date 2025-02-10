import { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Card,
  CardContent,
  Box,
} from "@mui/material";

interface SavingsProps {
  setSavings: React.Dispatch<React.SetStateAction<number>>;
  balance: number; // ✅ Hanya saldo yang tersedia untuk tabungan
}

const Savings: React.FC<SavingsProps> = ({ setSavings, balance }) => {
  const [savingsList, setSavingsList] = useState<{ id: number; name: string; amount: number }[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const addSaving = () => {
    if (!name || amount <= 0 || amount > balance) {
      alert("Nominal tidak valid atau melebihi saldo yang tersedia.");
      return;
    }
    const newSaving = { id: savingsList.length + 1, name, amount };
    setSavingsList([...savingsList, newSaving]);
    setSavings((prev) => prev + amount); // ✅ Update saldo tabungan
    setName("");
    setAmount(0);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Box sx={{ maxWidth: 600, width: "100%" }}>
        <Card sx={{ padding: 3, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
          <CardContent>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Tabungan Saya
            </Typography>
            <Typography textAlign="center" sx={{ color: "gray" }}>
              Saldo Tersedia: <strong>Rp {balance.toLocaleString()}</strong>
            </Typography>
            {/* Form Tambah Tabungan */}
            <TextField
              label="Nama Tabungan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Jumlah"
              type="number"
              value={amount === 0 ? "" : amount} // ✅ Kosongkan jika 0
              onChange={(e) => {
                const newValue = e.target.value;
                if (/^\d*$/.test(newValue)) {
                  // ✅ Cegah karakter non-angka
                  setAmount(newValue === "" ? 0 : Number(newValue));
                }
              }}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addSaving}
              sx={{ mt: 2 }}
            >
              Tambah Tabungan
            </Button>
            {/* List Tabungan */}
            <List sx={{ marginTop: 3 }}>
              {savingsList.length === 0 ? (
                <Typography textAlign="center" sx={{ color: "gray" }}>
                  Belum ada tabungan
                </Typography>
              ) : (
                savingsList.map((saving) => (
                  <ListItem
                    key={saving.id}
                    sx={{ borderBottom: "1px solid #eee" }}
                  >
                    <ListItemText
                      primary={saving.name}
                      secondary={`Rp ${saving.amount.toLocaleString()}`}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Savings;
