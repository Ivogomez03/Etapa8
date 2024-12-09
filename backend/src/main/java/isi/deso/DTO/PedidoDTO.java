/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package isi.deso.DTO;

import isi.deso.model.Estado;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

/**
 *
 * @author ivogo
 */
@Getter
@Setter
public class PedidoDTO {
    private int id;
    private List<ItemsPedidoDTO> detalle;
    private Estado estado;
    private String pago;
    private String CuitCliente;
    private String DniVendedor;
    private double montoPago;
    private String credenciales;

    public PedidoDTO() {
    };
}