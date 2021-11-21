//
//  ViewController.swift
//  SceneKit_Test
//
//  Created by Tomohiko HARADA on 2021/11/16.
//

import UIKit
import SceneKit
import ARKit

class ViewController: UIViewController, ARSCNViewDelegate, CLLocationManagerDelegate, ARSessionDelegate {

    @IBOutlet var sceneView: ARSCNView!
    @IBOutlet weak var UILabel1: UILabel!
    @IBOutlet weak var UISwitch1: UISwitch!
    @IBOutlet weak var UISwitch2: UISwitch!
    @IBOutlet weak var UISwitch3: UISwitch!
    @IBOutlet weak var UISwitch4: UISwitch!

    private var locationManager: CLLocationManager!
    private var locationTimes: Int64 = -1
    private var latitude: CLLocationDegrees!
    private var longitude: CLLocationDegrees!
    private var outputDirURL: URL!
    private var lastTimes: Int64 = -1
    private var isRecording = false
    private var is30fps = true
    private var is1280p = true
    private var isPcd = true
    private var configuration: ARWorldTrackingConfiguration!

    let userDefaults = UserDefaults.standard
    @IBAction func switch1Changed(_ sender: UISwitch) {
        isRecording = sender.isOn
        userDefaults.set(sender.isOn, forKey: "Key1")
    }
    @IBAction func switch2Changed(_ sender: UISwitch) {
        is30fps = sender.isOn
        userDefaults.set(sender.isOn, forKey: "Key4")
    }
    @IBAction func switch3Changed(_ sender: UISwitch) {
        is1280p = sender.isOn
        userDefaults.set(sender.isOn, forKey: "Key2")
        selectVideoFormatAndRunSession()
    }
    @IBAction func switch4Changed(_ sender: UISwitch) {
        isPcd = sender.isOn
        userDefaults.set(sender.isOn, forKey: "Key3")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        
//        // Set the view's delegate
//        sceneView.delegate = self
//
//        // Show statistics such as fps and timing information
//        sceneView.showsStatistics = true
//
//        // Create a new scene
//        let scene = SCNScene(named: "art.scnassets/ship.scn")!
//
//        // Set the scene to the view
//        sceneView.scene = scene

        // *** by haradatm
        guard let documentURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first else { return }
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd-HH-mm-ss-SSS"
        outputDirURL = documentURL.appendingPathComponent(dateFormatter.string(from: Date()))

        do {
            try FileManager.default.createDirectory(at: outputDirURL, withIntermediateDirectories: true)
        } catch {
            print(error)
        }

        locationManager = CLLocationManager()
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()
        isRecording = false
        userDefaults.set(isRecording, forKey: "Key1")
        UISwitch1.isOn = userDefaults.bool(forKey: "Key1")
        userDefaults.set(is1280p, forKey: "Key2")
        UISwitch2.isOn = userDefaults.bool(forKey: "Key2")
        userDefaults.set(isPcd, forKey: "Key3")
        UISwitch3.isOn = userDefaults.bool(forKey: "Key3")
        // *** by haradatm
    }
    
    func selectVideoFormatAndRunSession() {
        let formats = ARWorldTrackingConfiguration.supportedVideoFormats
        for format in formats {
            if (self.is1280p) {
                if (format.imageResolution.width == 1280.0 && format.imageResolution.height ==  720.0) {
                    configuration.videoFormat = format
                }
            }
            else {
                if (format.imageResolution.width == 1920.0 && format.imageResolution.height == 1080.0) {
                    configuration.videoFormat = format
                }
            }
        }
        print(configuration ?? "configuration is nil")
        sceneView.session.run(configuration)
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
//        // Create a session configuration
//        let configuration = ARWorldTrackingConfiguration()
//
//        // Run the view's session
//        sceneView.session.run(configuration)

        // *** by haradatm
        super.viewWillAppear(animated)

        UIApplication.shared.isIdleTimerDisabled = true
        sceneView.session.delegate = self

        // Create a session configuration
        // Create a session configuration
        configuration = ARWorldTrackingConfiguration()
        configuration.providesAudioData = false

        // Run the view's session
        selectVideoFormatAndRunSession()

        let header_camera =
            "timestamp," +
            "trackingState," +
            "Camera.fx," +
            "Camera.fy," +
            "Camera.ox," +
            "Camera.oy," +
            "rotation(0:0)," +
            "rotation(0:1)," +
            "rotation(0:2)," +
            "rotation(1:0)," +
            "rotation(1:1)," +
            "rotation(1:2)," +
            "rotation(2:0)," +
            "rotation(2:1)," +
            "rotation(2:2)," +
            "rotation(3:0)," +
            "rotation(3:1)," +
            "rotation(3:2)," +
            "transform(x)," +
            "transform(y)," +
            "transform(z)," +
            "eulerAngles(x)," +
            "eulerAngles(y)," +
            "eulerAngles(z)," +
            "exposureDuration," +
            "exposureOffset," +
            "width," +
            "height," +
            "lightEstimate," +
            "now," +
            "lastLocationTimes," +
            "lastLatitude," +
            "lastLongitude," +
            "pointCount," +
            "points\n"

        let filename_camera = outputDirURL.appendingPathComponent("camera.txt")
        guard let os_camera = OutputStream(url: filename_camera, append: true) else {return}
        os_camera.open()
        defer { os_camera.close() }
        guard let data_camera = header_camera.data(using: .utf8) else {return}
        data_camera.withUnsafeBytes({
            let unsafeBufferPtr = $0.bindMemory(to: UInt8.self)
            if let unsafePtr = unsafeBufferPtr.baseAddress {
                _ = os_camera.write(unsafePtr, maxLength: $0.count)
            }
        })

        let header_location =
            "timestamp," +
            "latitude," +
            "longitude\n"

        let filename_location = outputDirURL.appendingPathComponent("location.txt")
        guard let os_location = OutputStream(url: filename_location, append: true) else {return}
        os_location.open()
        defer { os_location.close() }
        guard let data_location = header_location.data(using: .utf8) else {return}
        data_location.withUnsafeBytes({
            let unsafeBufferPtr = $0.bindMemory(to: UInt8.self)
            if let unsafePtr = unsafeBufferPtr.baseAddress {
                _ = os_location.write(unsafePtr, maxLength: $0.count)
            }
        })
        // *** by haradatm
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        // *** by haradatm
        UIApplication.shared.isIdleTimerDisabled = false

        isRecording = false
        userDefaults.set(isRecording, forKey: "Key1")
        UISwitch1.isOn = userDefaults.bool(forKey: "Key1")
        // *** by haradatm

        // Pause the view's session
        sceneView.session.pause()
    }

    // MARK: - ARSCNViewDelegate
    
/*
    // Override to create and configure nodes for anchors added to the view's session.
    func renderer(_ renderer: SCNSceneRenderer, nodeFor anchor: ARAnchor) -> SCNNode? {
        let node = SCNNode()
     
        return node
    }
*/
    
    func session(_ session: ARSession, didFailWithError error: Error) {
        // Present an error message to the user
        
    }
    
    func sessionWasInterrupted(_ session: ARSession) {
        // Inform the user that the session has been interrupted, for example, by presenting an overlay
        
    }
    
    func sessionInterruptionEnded(_ session: ARSession) {
        // Reset tracking and/or remove existing anchors if consistent tracking is required
        
    }

    func session(_ session: ARSession, didUpdate frame: ARFrame) {
        let timestamp = Int64(frame.timestamp * 1000000)

        if (is30fps) {
            if (lastTimes > 0 && (timestamp - lastTimes) < 33000) {
                return
            }
        }

        var fps = 0.0
        if (lastTimes > 0) {
            fps = 1000000.0 / Double(timestamp - lastTimes)
        }
        lastTimes = timestamp

        let camera = frame.camera
        var trackingState = "normal"

        switch camera.trackingState {
        case .notAvailable:
            trackingState = "notAvailable"
        case .normal:
            trackingState = "normal"
        case .limited(.initializing):
            trackingState = "initializing"
        case .limited(.relocalizing):
            trackingState = "relocalizing"
        case .limited(.excessiveMotion):
            trackingState = "excessiveMotion"
        case .limited(.insufficientFeatures):
            trackingState = "insufficientFeatures"
        case .limited(_):
            trackingState = "limited"
        }

        DispatchQueue.main.async {
            let msg =
            " fps: \(String(format: "%.02f", fps))  \n" +
            " state: \(trackingState) \n" +
            " Camera.fx: \(camera.intrinsics.columns.0.x)  \n" +
            " Camera.fy: \(camera.intrinsics.columns.1.y)  \n" +
            " Camera.ox: \(camera.intrinsics.columns.2.x)  \n" +
            " Camera.oy: \(camera.intrinsics.columns.2.y)  \n" +
            " transform.x: \(camera.transform.columns.3.x)  \n" +
            " transform.y: \(camera.transform.columns.3.y)  \n" +
            " transform.z: \(camera.transform.columns.3.z)  \n" +
            " exposureDuration: \(String(format: "%.8f", camera.exposureDuration))  \n" +
            " exposureOffset:   \(camera.exposureOffset)  \n" +
            " width:  \(camera.imageResolution.width)  \n" +
            " height: \(camera.imageResolution.height)  \n" +
            " latitude:  \(String(self.latitude))  \n" +
            " longitude: \(String(self.longitude))  \n" +
            " pcd: \(self.isPcd ? "on" : "off")  \n" +
            " isRecording: \(self.isRecording ? "on" : "off")  \n"
            self.UILabel1.text = msg
        }

        if (isRecording) {

            DispatchQueue.global(qos: .userInitiated).async {

                var array = [[Float]]()
                var counts = 0
                if (self.isPcd) {
                    if (frame.rawFeaturePoints != nil && frame.rawFeaturePoints?.points != nil) {
                        let pointCloud = frame.rawFeaturePoints?.points
                        counts = pointCloud?.count ?? 0
                        for index in 0..<counts {
                            array.append([pointCloud![index].x, pointCloud![index].y, pointCloud![index].z])
                        }
                    }
                }

                let text =
                    "\(timestamp)," +
                    "\(trackingState)," +
                    "\(camera.intrinsics.columns.0.x)," +
                    "\(camera.intrinsics.columns.1.y)," +
                    "\(camera.intrinsics.columns.2.x)," +
                    "\(camera.intrinsics.columns.2.y)," +
                    "\(camera.transform.columns.0.x)," +
                    "\(camera.transform.columns.1.x)," +
                    "\(camera.transform.columns.2.x)," +
                    "\(camera.transform.columns.0.y)," +
                    "\(camera.transform.columns.1.y)," +
                    "\(camera.transform.columns.2.y)," +
                    "\(camera.transform.columns.0.z)," +
                    "\(camera.transform.columns.1.z)," +
                    "\(camera.transform.columns.2.z)," +
                    "\(camera.transform.columns.0.w)," +
                    "\(camera.transform.columns.1.w)," +
                    "\(camera.transform.columns.2.w)," +
                    "\(camera.transform.columns.3.x)," +
                    "\(camera.transform.columns.3.y)," +
                    "\(camera.transform.columns.3.z)," +
                    "\(camera.eulerAngles.x)," +
                    "\(camera.eulerAngles.y)," +
                    "\(camera.eulerAngles.z)," +
                    "\(camera.exposureDuration)," +
                    "\(camera.exposureOffset)," +
                    "\(camera.imageResolution.width)," +
                    "\(camera.imageResolution.height)," +
                    "\(frame.lightEstimate?.ambientIntensity ?? 0)," +
                    "\(Int64(Date().timeIntervalSince1970 * 1000000))," +
                    "\(self.locationTimes)," +
                    "\(String(self.latitude))," +
                    "\(String(self.longitude))," +
                    "\(counts)," +
                    "\"" + "\(array)" + "\"\n"

                let filename1 = self.outputDirURL.appendingPathComponent("camera.txt")
                guard let outputStream = OutputStream(url: filename1, append: true) else {return}
                outputStream.open()
                defer { outputStream.close() }
                guard let data = text.data(using: .utf8) else {return}
                data.withUnsafeBytes({
                    let unsafeBufferPtr = $0.bindMemory(to: UInt8.self)
                    if let unsafePtr = unsafeBufferPtr.baseAddress {
                        _ = outputStream.write(unsafePtr, maxLength: $0.count)
                    }
                })

                let capturedImage = frame.capturedImage
                let ciImageDepth = CIImage(cvPixelBuffer: capturedImage)
                let contextDepth:CIContext = CIContext.init(options: nil)
                let cgImageDepth:CGImage = contextDepth.createCGImage(ciImageDepth, from: ciImageDepth.extent)!
                let uiImageDepth:UIImage = UIImage(cgImage: cgImageDepth, scale: 0, orientation: .right)
                let pngImageData = uiImageDepth.pngData()

                let filename2 = self.outputDirURL.appendingPathComponent(String(timestamp) + ".png")
                do {
                    try pngImageData!.write(to: filename2, options: .atomic)
                } catch {
                    print(error)
                }
            }
        }
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let location = locations.first
        if (location != nil) {

            self.locationTimes = Int64(Date().timeIntervalSince1970 * 1000000)
            self.latitude = location?.coordinate.latitude
            self.longitude = location?.coordinate.longitude

            if (isRecording) {

                DispatchQueue.global(qos: .userInitiated).async {

                    let text =
                        "\(self.locationTimes)," +
                        "\(self.latitude ?? 0)," +
                        "\(self.longitude ?? 0)\n"

                    let filename = self.outputDirURL.appendingPathComponent("location.txt")
                    guard let outputStream = OutputStream(url: filename, append: true) else {return}
                    outputStream.open()
                    defer { outputStream.close() }
                    guard let data = text.data(using: .utf8) else {return}
                    data.withUnsafeBytes({
                        let unsafeBufferPtr = $0.bindMemory(to: UInt8.self)
                        if let unsafePtr = unsafeBufferPtr.baseAddress {
                            _ = outputStream.write(unsafePtr, maxLength: $0.count)
                        }
                    })
                }
            }
        }
    }
}
