const dbConnection = require("../database/Conect");

class DoseService{

  //Adicionar Dose
async  addDose(doseTemp) {
  try {
    console.log(doseTemp);
    const connection = await dbConnection();
    const query = `
    INSERT INTO GadoSeguro.Dose (nome_vacina, lote, info, data_aplicada, data_prev) 
    VALUES (?,?,?,?,?)
    `;
    const values = [
      doseTemp.nome_vacina,
      doseTemp.lote,
      doseTemp.info,
      doseTemp.data_aplicada,
      doseTemp.data_prev
    ];
    await connection.execute(query, values);
    console.log("Objeto Dose adicionado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar o objeto Dose:", error);
  }
}

//Retornar todas as Doses de uma vacina
async getAll() {
  try {
      const connection = await dbConnection()
      const [doses] = await connection.query('SELECT * FROM Dose')
      return doses
  } catch (error) {
      console.log(error);
      return error
  }
}

//Retornar uma Dose pelo ID 
async getAllDoseId(idDose) {
  try {
      const connection = await dbConnection()
      const [doses] = await connection.query('SELECT * FROM Dose WHERE idDose=?;', idDose)
      return doses
  } catch (error) {
      console.log(error);
      return error
  }
}

//Retornar as doses de uma vacina
async getAllDosesFromVacina(nome_vacina) {
  console.log("Atras das dose de ", nome_vacina)
  try {
      const connection = await dbConnection()
      const [doses] = await connection.query('SELECT * FROM Dose WHERE nome_vacina=?;', nome_vacina)
      console.log(doses[0])
      return doses
  } catch (error) {
      console.log(error);
      return error
  }
}

//Atualiza uma Dose pelo ID 
async getUpdateDose(idDose, doseTemp) {
  try {
    const connection = await dbConnection();
    const query = `
    UPDATE GadoSeguro.Dose SET nome_vacina=?, lote=?, info=?, data_aplicada=?, data_prev=? 
    WHERE idDose=?
    `;
    const values = [
      doseTemp.nome_vacina,
      doseTemp.lote,
      doseTemp.info,
      doseTemp.data_aplicada,
      doseTemp.data_prev,
      idDose
    ];
    await connection.execute(query, values);
    Console.log("Dose Atualizada");
  } catch (error) {
      console.log("Problema em atualizar a dose",error);
      return error
  }
}

//Deletar Dose pelo ID
async  deleteDose(idDose) {
  try {
    const connection = await dbConnection();
    await connection.query('DELETE FROM GadoSeguro.Dose WHERE idDose=?;', idDose);
  } catch (error) {
    console.error("Erro ao deletar o objeto fazendaDose:", error);
  }
}
}

module.exports = new DoseService();